const path = require('path');
const fs = require('fs');
const utils = require('#utils');
const ethUtil = require('ethereumjs-util');

// TODO: direct import cause fails in some docker scripts
let storage;

class Deployer {
    constructor(ctx) {
        this.ctx = ctx;
        this.log = ctx.log.child({module: 'Deployer'});
        this.config = this.ctx.config.deployer;
        this.cache_uploaded = {}; // todo: unused? either remove or use
        storage = require('../../storage/index.js');
    }

    async start() {
        // todo
    }

    getCacheDir() {
        const cache_dir = path.join(this.ctx.datadir, this.config.cache_path);
        utils.makeSurePathExists(cache_dir);
        return cache_dir;
    }

    async migrate() {
        const privateKeyHex = this.ctx.wallet.getNetworkAccountPrivateKey();
        const privateKey = Buffer.from(privateKeyHex, 'hex');
        const publicKey = ethUtil.privateToPublic(privateKey);

        this.log.info(privateKeyHex);
        this.log.info(privateKey);
        this.log.info(publicKey);
    }

    async deploy(deployPath, deployContracts = false, dev = false) {
        // todo: error handling, as usual
        const deployConfigFilePath = path.join(deployPath, 'point.deploy.json');
        const deployConfigFile = fs.readFileSync(deployConfigFilePath, 'utf-8');
        const deployConfig = JSON.parse(deployConfigFile);

        // assert(deployConfig.version === 1); // todo: msg

        const target = dev ? `${deployConfig.target.replace('.z', 'dev')}.z` : deployConfig.target;
        const identity = target.replace(/\.z$/, '');
        const {defaultAccount: owner} = this.ctx.web3.eth;

        const registeredOwner = await this.ctx.web3bridge.ownerByIdentity(identity);
        const identityIsRegistered =
            registeredOwner && registeredOwner !== '0x0000000000000000000000000000000000000000';

        if (identityIsRegistered && registeredOwner !== owner) {
            this.ctx.log.error(
                {identity, registeredOwner, owner},
                'Identity is already registered'
            );
            throw new Error(
                `Identity ${identity} is already registered, please choose a new one and try again`
            );
        }

        if (!identityIsRegistered) {
            const privateKeyHex = this.ctx.wallet.getNetworkAccountPrivateKey();
            const privateKey = Buffer.from(privateKeyHex, 'hex');
            const publicKey = ethUtil.privateToPublic(privateKey);

            this.ctx.log.info({
                identity,
                owner,
                publicKey: publicKey.toString('hex'),
                len: Buffer.byteLength(publicKey, 'utf-8'),
                parts: [
                    `0x${publicKey.slice(0, 32).toString('hex')}`,
                    `0x${publicKey.slice(32).toString('hex')}`
                ]
            }, 'Registring new identity');

            await this.ctx.web3bridge.registerIdentity(identity, owner, publicKey);

            this.ctx.log.info(
                {identity, owner, publicKey: publicKey.toString('hex')},
                'Successfully registered new identity'
            );
        }

        // Deploy contracts
        if (deployContracts) {
            let contractNames = deployConfig.contracts;
            if (!contractNames) contractNames = [];
            for (const contractName of contractNames) {
                const fileName = path.join(deployPath, 'contracts', contractName + '.sol');
                try {
                    await this.deployContract(target, contractName, fileName, deployPath);
                } catch (e) {
                    this.ctx.log.error(
                        {
                            message: e.message,
                            stack: e.stack
                        },
                        'Zapp contract deployment error'
                    );
                    throw e;
                }
            }
        }

        // Upload public - root dir
        this.log.debug('Uploading root directory...');
        const publicDirId = await storage.uploadDir(path.join(deployPath, 'public'));
        await this.updateKeyValue(target, {'::rootDir': publicDirId}, deployPath, deployContracts);

        // Upload routes
        const routesFilePath = path.join(deployPath, 'routes.json');
        const routesFile = fs.readFileSync(routesFilePath, 'utf-8');
        const routes = JSON.parse(routesFile);

        this.log.debug({routes}, 'Uploading route file...');
        this.ctx.client.deployerProgress.update(routesFilePath, 0, 'uploading');
        const routeFileUploadedId = await storage.uploadFile(JSON.stringify(routes));
        this.ctx.client.deployerProgress.update(
            routesFilePath,
            100,
            `uploaded::${routeFileUploadedId}`
        );
        await this.updateZDNS(target, routeFileUploadedId);

        await this.updateKeyValue(target, deployConfig.keyvalue, deployPath, deployContracts);

        this.log.info('Deploy finished');
    }

    static async getPragmaVersion(source) {
        const regex = /pragma solidity [\^~><]?=?(?<version>[0-9.]*);/;
        const found = source.match(regex);
        if (found) {
            return found.groups.version;
        } else {
            throw new Error('Contract has no compiler version');
        }
    }

    async deployContract(target, contractName, fileName, deployPath) {
        this.ctx.client.deployerProgress.update(fileName, 0, 'compiling');
        const fs = require('fs-extra');

        const contractSource = fs.readFileSync(fileName, 'utf8');

        const version = await Deployer.getPragmaVersion(contractSource);
        const versionArray = version.split('.');
        const SOLC_MAJOR_VERSION = versionArray[0];
        const SOLC_MINOR_VERSION = versionArray[1];
        const SOLC_FULL_VERSION = `solc${SOLC_MAJOR_VERSION}_${SOLC_MINOR_VERSION}`;

        const path = require('path');
        const solc = require(SOLC_FULL_VERSION);

        const compileConfig = {
            language: 'Solidity',
            sources: {[contractName + '.sol']: {content: contractSource}},
            settings: {
                outputSelection: {
                    // return everything
                    '*': {'*': ['*']}
                }
            }
        };

        const getImports = function (dependency) {
            const dependencyOriginalPath = path.join(deployPath, 'contracts', dependency);
            const dependencyNodeModulesPath = path.join(deployPath, 'node_modules/', dependency);
            if (fs.existsSync(dependencyOriginalPath)) {
                return {contents: fs.readFileSync(dependencyOriginalPath, 'utf8')};
            } else if (fs.existsSync(dependencyNodeModulesPath)) {
                return {contents: fs.readFileSync(dependencyNodeModulesPath, 'utf8')};
            } else {
                throw new Error('Could not find contract dependency, have you tried npm install?');
            }
        };

        const compiledSources = JSON.parse(
            solc.compile(JSON.stringify(compileConfig), {import: getImports})
        );
        this.ctx.client.deployerProgress.update(fileName, 20, 'compiled');
        if (!compiledSources) {
            throw new Error(
                '>>>>>>>>>>>>>>>>>>>>>>>> SOLIDITY COMPILATION ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\nNO OUTPUT'
            );
        } else if (compiledSources.errors) {
            let found = false;
            let msg = '';
            for (const e of compiledSources.errors) {
                if (e.severity === 'warning') {
                    this.log.warn(e, 'Contract compilation warning');
                    continue;
                }
                found = true;
                msg += e.formattedMessage + '\n';
            }
            msg =
                '>>>>>>>>>>>>>>>>>>>>>>>> SOLIDITY COMPILATION ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n' +
                msg;
            if (found) throw new Error(msg);
        }

        let artifacts;
        for (const contractFileName in compiledSources.contracts) {
            const fileName = contractFileName.split('\\').pop().split('/').pop();
            const _contractName = fileName.replace('.sol', '');
            if (contractName === _contractName) {
                artifacts = compiledSources.contracts[contractFileName][_contractName];
            }
        }

        const contract = new this.ctx.web3.eth.Contract(artifacts.abi);

        const deploy = contract.deploy({data: artifacts.evm.bytecode.object});
        const gasPrice = await this.ctx.web3.eth.getGasPrice();
        const estimate = await deploy.estimateGas();
        const tx = await deploy.send({
            from: this.ctx.web3.eth.defaultAccount,
            gasPrice,
            gas: Math.floor(estimate * 1.1)
        });
        const address = tx.options && tx.options.address;

        this.log.debug({contractName, address}, 'Deployed Contract Instance');
        this.ctx.client.deployerProgress.update(fileName, 40, 'deployed');

        const artifactsJSON = JSON.stringify(artifacts);

        this.ctx.client.deployerProgress.update(fileName, 60, 'saving_artifacts');
        const artifacts_storage_id = await storage.uploadFile(artifactsJSON);

        this.ctx.client.deployerProgress.update(fileName, 80, `updating_zweb_contracts`);
        await this.ctx.web3bridge.putKeyValue(
            target,
            'zweb/contracts/address/' + contractName,
            address
        );
        await this.ctx.web3bridge.putKeyValue(
            target,
            'zweb/contracts/abi/' + contractName,
            artifacts_storage_id
        );

        this.ctx.client.deployerProgress.update(fileName, 100, `uploaded::${artifacts_storage_id}`);

        this.log.debug(
            `Contract ${contractName} with Artifacts Storage ID ${artifacts_storage_id} is deployed to ${address}`
        );
    }

    async updateZDNS(host, id) {
        const target = host.replace('.z', '');
        this.log.info({target, id}, 'Updating ZDNS');
        await this.ctx.web3bridge.putZRecord(target, '0x' + id);
    }

    async updateKeyValue(target, values, deployPath, deployContracts = false) {
        const replaceContentsWithCids = async obj => {
            const result = {};

            for (let [key, value] of Object.entries(obj)) {
                if (/^storage\[[^\]]+\]$/.test(key)) {
                    key = key.replace(/.*storage\[([^\]]+)\].*/, '$1');

                    if ('blob' in value) {
                        const uploaded = await storage.uploadFile(String(value.blob));

                        value = uploaded;
                    } else if ('file' in value) {
                        const filePath = path.join(deployPath, 'public', value.file);

                        if (!fs.existsSync(filePath)) {
                            throw new Error('File not found: ' + filePath);
                        }

                        const ext = value.file.replace(/.*\.([a-zA-Z0-9]+)$/, '$1');
                        const file = await fs.promises.readFile(filePath);
                        const cid = await storage.uploadFile(file);

                        value = '/_storage/' + cid + '.' + ext;
                    } else {
                        throw new Error('Storage resource not specified: ' + JSON.stringify(value));
                    }
                } else if (typeof value === 'object') {
                    value = await replaceContentsWithCids(value);
                } else if (Array.isArray(value)) {
                    for (const i in value) {
                        if (typeof value[i] === 'object') {
                            value[i] = await replaceContentsWithCids(value[i]);
                        }
                    }
                }

                result[key] = value;
            }

            return result;
        };

        values = await replaceContentsWithCids(values);

        for (let [key, value] of Object.entries(values)) {
            if (value && (Array.isArray(value) || typeof value === 'object')) {
                // if there is a contract_send in the value then send data to the specified contract
                if ('contract_send' in value && deployContracts) {
                    const [contractName, methodNameAndParams] = value.contract_send.split('.');
                    let [methodName, paramsTogether] = methodNameAndParams.split('(');
                    paramsTogether = paramsTogether.replace(')', '');
                    const paramNames = paramsTogether.split(',');
                    const params = [];
                    if (value.metadata) {
                        const metadataHash = await storage.uploadFile(
                            JSON.stringify(value.metadata)
                        );
                        value.metadata['metadataHash'] = metadataHash;
                        for (const paramName of paramNames) {
                            params.push(value.metadata[paramName]);
                        }
                    } else {
                        for (const paramName of paramNames) {
                            params.push(value[paramName]);
                        }
                    }
                    await this.ctx.web3bridge.sendToContract(
                        target,
                        contractName,
                        methodName,
                        params
                    );
                }
                value = JSON.stringify(value);
            }
            await this.ctx.web3bridge.putKeyValue(target, key, String(value));
        }
    }
}

module.exports = Deployer;

require('@typechain/hardhat');
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require('./hardhat/tasks/explorer/explorer-set-index-md');

let ynetPrivateKey = process.env.DEPLOYER_ACCOUNT;
if (ynetPrivateKey === undefined && process.env.MODE !== 'e2e' && process.env.MODE !== 'zappdev'){
    const homedir = require('os').homedir();
    require('path').resolve(homedir, '.point', 'keystore', 'key.json');
    const wallet = require('ethereumjs-wallet').hdkey.fromMasterSeed(
        require('bip39').mnemonicToSeedSync(require(
            require('path').resolve(homedir, '.point', 'keystore', 'key.json')).phrase
        )
    ).getWallet();
    ynetPrivateKey = wallet.getPrivateKey().toString('hex');
}

if (process.env.MODE !== 'e2e' && process.env.MODE !== 'zappdev' && ynetPrivateKey === undefined){
    throw new Error('ynetPrivateKey is not set.');
}

const privateKey = process.env.DEPLOYER_ACCOUNT || '0x011967d88c6b79116bb879d4c2bc2c3caa23569edd85dfe0bc596846837bbc8e';
const host = process.env.BLOCKCHAIN_HOST || 'blockchain_node';
const port = process.env.BLOCKCHAIN_PORT || 7545;

const devaddress = 'http://' + host + ':' + port;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

let defaultNetwork;
if (process.env.MODE === 'e2e' || process.env.MODE === 'zappdev') {
    defaultNetwork = 'development';
} else {
    defaultNetwork = 'ynet';
}

const ynetConfig = {url: 'http://ynet.point.space:44444'};

if (ynetPrivateKey){
    ynetConfig.accounts = [ynetPrivateKey];
}

const optimizerConfig = {
    optimizer: {
        enabled: true,
        runs: 1000
    }
};

const config = {
    solidity: {
        compilers: [
            {
                version: '0.8.0',
                settings: {...optimizerConfig}
            },
            {
                version: '0.8.4',
                settings: {...optimizerConfig}
            },
            {
                version: '0.8.7',
                settings: {...optimizerConfig}
            }
        ],
    },
    paths: {
        artifacts:'./hardhat/build',
        sources: './hardhat/contracts',
        tests: './hardhat/tests',
        cache: './hardhat/cache'
    },
    networks: {
        development: {
            url: devaddress,
            accounts: [privateKey]
        },
        ynet: ynetConfig
    },
    defaultNetwork: defaultNetwork
};

module.exports = config;

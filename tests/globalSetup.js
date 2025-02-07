const initFolders = require('../dist/initFolders');
const storage = require('../dist/client/storage');
const migrate = require('../dist/util/migrate');

module.exports = async () => {
    if (process.env.TESTING_IN_DOCKER) {
        const {getContractAddress} = require('../dist/util');

        const identityContractAddress = getContractAddress('Identity');
        if (!identityContractAddress) {
            throw new Error('Could not get Identity contract address');
        }
        process.env.IDENTITY_CONTRACT_ADDRESS = identityContractAddress;
    }

    await initFolders.default();
    await migrate.default();
    await storage.init();
};

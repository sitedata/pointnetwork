// This file would eventually replace ./ethereum.js;
// this approach, although a little messy, would allow a
// gradual migration.
import {ethers} from 'ethers';
import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
// eslint-disable-next-line
// @ts-ignore It complains about missing types, but I don't want to install any dependencies yet.
import NonceTrackerSubprovider from 'web3-provider-engine/subproviders/nonce-tracker';
import config from 'config';
import {Provider, ChainId} from './provider';
import {DomainRegistry} from '../../name_service/types';
import {getNetworkPrivateKey} from '../../wallet/keystore';
import {POINT_ENS_TEXT_RECORD_KEY} from '../../name_service/constants';
import logger from '../../core/log';

const log = logger.child({module: 'EthereumProvider'});

type Ethers = ethers.providers.JsonRpcProvider;
type Libs = 'ethers' | 'web3';

/**
 * Singleton class to make calls and send transactions to Ethereum blockchain.
 * With potential support for multiple chains (mainnet, rinkeby, ynet, etc.).
 */
class EthereumProvider implements Provider {
    private static instance: EthereumProvider;

    // Lazily instantiated providers to interact with different Ethereum chains.
    // Ideally, we will at some point be able to remove `web3.js` and just use `ethers`,
    // simplifying this `chains` map (should look like the one in the Solana provider).
    private chains: {[key in ChainId]?: Record<Libs, Web3 | Ethers | null>} = {};

    private constructor() {}

    public static getInstance() {
        if (!EthereumProvider.instance) {
            EthereumProvider.instance = new EthereumProvider();
        }
        return EthereumProvider.instance;
    }

    /**
     * Creates a connection to an Ethereum provider with `web3.js` library,
     * as long as we have a provider URL in the config
     * for the given chain. Otherwise, it throws an error.
     */
    private createWeb3Connection(chainId: ChainId): Web3 {
        // TODO: this only creates HTTP providers. Need to think how to handle WS.
        const networks: Record<string, string>[] = config.get('network.web3');
        const network = Object.values(networks).find(n => n.chain_id === chainId);
        if (!network) {
            const errMsg = `No network found with chain_id === ${chainId} in config.`;
            log.error({chainId}, errMsg);
            throw new Error(errMsg);
        }

        const host = network.address;
        const protocol = network.tls ? 'https' : 'http';
        const url = `${protocol}://${host}`;
        const privateKey = `0x${getNetworkPrivateKey()}`;

        const hdWalletProvider = new HDWalletProvider({
            privateKeys: [privateKey],
            providerOrUrl: url,
            pollingInterval: 30000
        });
        
        const nonceTracker = new NonceTrackerSubprovider();
        hdWalletProvider.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(hdWalletProvider.engine);
        const web3 = new Web3(hdWalletProvider);
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;
        log.info({chainId, url}, 'Successfully created web3 instance.');
        return web3;
    }

    /**
     * Creates a connection to an Ethereum provider with `ethers` library,
     * as long as we have a provider URL in the config
     * for the given chain. Otherwise, it throws an error.
     */
    private createEthersConnection(chainId: ChainId): Ethers {
        const networks: Record<string, string>[] = config.get('network.web3');
        const network = Object.values(networks).find(n => n.chain_id === chainId);
        if (!network) {
            const errMsg = `No network found with chain_id === ${chainId} in config.`;
            log.error({chainId}, errMsg);
            throw new Error(errMsg);
        }

        const host = network.address;
        const protocol = network.tls ? 'https' : 'http';
        const url = `${protocol}://${host}`;
        log.info({chainId, url}, 'Successfully created ethers instance.');
        return new ethers.providers.JsonRpcProvider(url);
    }

    /**
     * Returns a provider for the given chain.
     * If one is not already available, it's created.
     *
     * Note: with some function overloads to get the correct return type
     */
    private getChainProvider(chainId: ChainId, lib: 'web3'): Web3
    private getChainProvider(chainId: ChainId, lib: 'ethers'): Ethers
    private getChainProvider(chainId: ChainId, lib: Libs): Web3 | Ethers {
        if (!this.chains[chainId]) {
            this.chains[chainId] = {ethers: null, web3: null};
        }

        // Try to look for something that plays nicer with TS in order to avoid the
        // assertions (`!`) here.
        if (!this.chains[chainId]![lib]) {
            const conn = lib === 'ethers'
                ? this.createEthersConnection(chainId)
                : this.createWeb3Connection(chainId);

            this.chains[chainId]![lib] = conn;
        }

        return this.chains[chainId]![lib]!;
    }

    public name(chainId: ChainId): string {
        return `EthereumProvider (chain: ${chainId})`;
    }

    public async resolveDomain(chainId: ChainId, domainName: string): Promise<DomainRegistry> {
        const provider = this.getChainProvider(chainId, 'ethers');
        const resolver = await provider.getResolver(domainName);
        if (!resolver) {
            const errMsg = `Domain ${domainName} not found in Ethereum's chain ${chainId}.`;
            log.error({chainId, domainName}, errMsg);
            throw new Error(errMsg);
        }

        const [owner, content] = await Promise.all([
            provider.resolveName(domainName),
            resolver.getText(POINT_ENS_TEXT_RECORD_KEY)
        ]);

        return {owner: owner || '', content};
    }

    public async getBlockNumber(chainId: ChainId): Promise<number> {
        // We could use this opportunity to migrate as much as possible from `web3.js` to `ethers`,
        // but here I want to show an example of how both libraries can coexist.
        const provider = this.getChainProvider(chainId, 'web3');
        const n = await provider.eth.getBlockNumber();
        return n;
    }
}

export default EthereumProvider;

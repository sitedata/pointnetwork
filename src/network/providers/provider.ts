import EthereumProvider from './ethereum-provider';
import SolanaProvider from './solana-provider';
import {DomainRegistry} from '../../name_service/types';
import logger from '../../core/log';

const log = logger.child({module: 'BlockchainProvider'});

// If we followed the naming convention we have in the config.networks.web3,
// it would be more convenient in some places where we need to get data from
// config. But, I think we should stick to the known chain ids as much as
// possible. Especially in ethereum, it would look weird to use `rinkeby` as
// a chain id instead of `4`.
export enum ChainId {
    PointYnet = 'ynet',
    EthereumMainnet = 1,
    EthereumRinkeby = 4,
    SolanaMainnet = 'mainnet-beta',
    SolanaDevnet = 'devnet',
}

export enum Blockchain {
    ETHEREUM = 'ethereum',
    SOLANA = 'solana',
}

/**
 * All blockchain providers must comply with this interface.
 */
export interface Provider {
    name(chainId: ChainId): string
    resolveDomain(chainId: ChainId, domain: string): Promise<DomainRegistry>
    getBlockNumber?(chainId: ChainId): Promise<number>
}

const chainToBlockchain: { [k in ChainId]: Blockchain } = {
    [ChainId.PointYnet]: Blockchain.ETHEREUM,
    [ChainId.EthereumMainnet]: Blockchain.ETHEREUM,
    [ChainId.EthereumRinkeby]: Blockchain.ETHEREUM,
    [ChainId.SolanaMainnet]: Blockchain.SOLANA,
    [ChainId.SolanaDevnet]: Blockchain.SOLANA
};

export const tldToChain: Record<string, ChainId> = {
    '.sol': ChainId.SolanaMainnet,
    '.eth': ChainId.EthereumRinkeby
};

/**
 * BlockchainProvider is the abstraction that consolidates and exposes
 * blockchain functionality and provides a unified solution for working
 * with different chains such as Ethereum and Solana.
 */
class BlockchainProvider implements Provider {
    private providers: {[key in Blockchain]?: Provider} = {};

    private getProvider(chainId: ChainId): Provider {
        const blockchain = chainToBlockchain[chainId];
        if (!this.providers[blockchain]) {
            switch (blockchain) {
                case Blockchain.ETHEREUM:
                    this.providers[blockchain] = EthereumProvider.getInstance();
                    break;
                case Blockchain.SOLANA:
                    this.providers[blockchain] = SolanaProvider.getInstance();
                    break;
                default:
                    const errMsg = `Unsupported chain ID "${chainId}".`;
                    log.error({chainId}, errMsg);
                    throw new Error(errMsg);
            }
        }
        return this.providers[blockchain] as Provider;
    }

    private notImplementedErr(chainId: ChainId, method: string): Error {
        const errMsg = `Method ${method} not implemented by ${this.name(chainId)}`;
        log.error({chainId, method}, errMsg);
        return new Error(errMsg);
    }

    public name(chainId: ChainId): string {
        // This and all the methods from the `Provider` interface could have try/catch logic, so that we could handle
        // and log errors here and wouldn't need any error handling in the Ethereum and Solana implementations.

        // No need to check if `name` is implemented by the provider because it's mandatory in the `Provider` interface.
        return this.getProvider(chainId).name(chainId);
    }

    public async resolveDomain(chainId: ChainId, domain: string): Promise<DomainRegistry> {
        // No need to check if `resolveDomain` is implemented by the provider because it's mandatory in the `Provider` interface.
        const registry = await this.getProvider(chainId).resolveDomain(chainId, domain);
        return registry;
    }

    public async getBlockNumber(chainId: ChainId): Promise<number> {
        const provider = this.getProvider(chainId);
        // Since this method is optional in the `Provider` interface, we check if the current provider implements it.
        if (!provider.getBlockNumber) {
            throw this.notImplementedErr(chainId, 'getBlockNumber');
        }

        const n = await provider.getBlockNumber(chainId);
        return n;
    }
}

export const blockchain = new BlockchainProvider();

// This file would eventually replace ./solana.ts;
// this approach, although a little messy, would allow a
// gradual migration.
import {Connection, Keypair, PublicKey} from '@solana/web3.js';
import {getHashedName, getNameAccountKey, NameRegistryState} from '@solana/spl-name-service';
import config from 'config';
import {Provider, ChainId} from './provider';
import {DomainRegistry} from '../../name_service/types';
import {getSolanaKeyPair} from '../../wallet/keystore';
import logger from '../../core/log';

const log = logger.child({module: 'SolanaProvider'});

// Address of the `.sol` TLD
const SOL_TLD_AUTHORITY = new PublicKey(config.get('name_services.sol_tld_authority'));

interface SolanaConnection {
  conn: Connection;
  wallet: Keypair;
}

/**
 * Singleton class to make calls and send transactions to Solana blockchain.
 * With potential support for multiple chains (mainnet, devnet, etc.).
 */
class SolanaProvider implements Provider {
    private static instance: SolanaProvider;

    // Lazily instantiated web3 providers to interact with different Solana chains.
    private chains: {[key in ChainId]?: SolanaConnection} = {};

    private constructor() {}

    public static getInstance() {
        if (!SolanaProvider.instance) {
            SolanaProvider.instance = new SolanaProvider();
        }
        return SolanaProvider.instance;
    }

    /**
     * Creates a connection to a Solana web3 provider,
     * as long as we have a provider URL in the config
     * for the given chain. Otherwise, it throws an error.
     */
    private createConnection(chainId: ChainId): SolanaConnection {
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
        const conn = new Connection(url, 'confirmed');
        const wallet = getSolanaKeyPair();
        log.info({chainId, url}, 'Successfully created solana-web3 instance.');
        return {conn, wallet};
    }

    /**
     * Returns a provider for the given chain.
     * If one is not already available, it's created.
     */
    private getChainProvider(chainId: ChainId): SolanaConnection {
        if (!this.chains[chainId]) {
            this.chains[chainId] = this.createConnection(chainId);
        }
        return this.chains[chainId] as SolanaConnection;
    }

    public name(chainId: ChainId): string {
        return `SolanaProvider (chain: ${chainId})`;
    }

    public async resolveDomain(chainId: ChainId, domainName: string): Promise<DomainRegistry> {
        const provider = this.getChainProvider(chainId);
        const domain = domainName.endsWith('.sol') ? domainName.replace(/.sol$/, '') : domainName;
        const hashed = await getHashedName(domain);
        const key = await getNameAccountKey(hashed, undefined, SOL_TLD_AUTHORITY);
        const registry = await NameRegistryState.retrieve(provider.conn, key);
        const content = registry.data?.toString().replace(/\x00/g, '');
        return {
            owner: registry.owner.toBase58(),
            content: content || null
        };
    }
}

export default SolanaProvider;

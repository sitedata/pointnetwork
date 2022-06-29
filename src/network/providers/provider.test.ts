import {blockchain, ChainId} from './provider';

const TIMEOUT = 15 * 1000;

describe('BlockchainProvider', () => {
    it('should return correct name for EthereumMainnet', () => {
        const chainId = ChainId.EthereumMainnet;
        const name = blockchain.name(chainId);
        expect(name).toBe(`EthereumProvider (chain: ${chainId})`);
    });

    it('should return correct name for PointYnet', () => {
        const chainId = ChainId.PointYnet;
        const name = blockchain.name(chainId);
        expect(name).toBe(`EthereumProvider (chain: ${chainId})`);
    });

    it('should return correct name for SolanaDevnet', () => {
        const chainId = ChainId.SolanaDevnet;
        const name = blockchain.name(chainId);
        expect(name).toBe(`SolanaProvider (chain: ${chainId})`);
    });

    // Not a fan of these tests because they use actual connections to blockchain,
    // so they could fail for external reasons, like hitting the limit of calls on 
    // the Infura node, the Domain expiring, etc.
    // Also, getting data from Etherum is slow.
    // But, they have the added value of testing the fact that the
    // blockchain nodes we connect to are running and reachable.
    // Need to think whether or not to keep them.
    it('should return correct Domain Registry for .sol domain (Mainnet)', async () => {
        const registry = await blockchain.resolveDomain(ChainId.SolanaMainnet, 'bonfida.sol');
        expect(registry.owner).toBe('FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ');
    });

    it('should return correct Domain Registry for .eth domain (Rinkeby)', async () => {
        const registry = await blockchain.resolveDomain(ChainId.EthereumRinkeby, 'germandv.eth');
        expect(registry.owner).toBe('0x966841B05625DCAB18760dE68E0dbB12c88Fa0aE');
    }, TIMEOUT);

    it('should return a block number for provider that implements getBlockNumber', async () => {
        const n = await blockchain.getBlockNumber(ChainId.PointYnet);
        expect(typeof n).toBe('number');
    }, TIMEOUT);

    it('should throw when calling a method not implemented by a provider', () => {
        const e = 'Method getBlockNumber not implemented by SolanaProvider (chain: devnet)';
        const wantErr = new Error(e);
        expect(blockchain.getBlockNumber(ChainId.SolanaDevnet)).rejects.toThrow(wantErr);
    });
});

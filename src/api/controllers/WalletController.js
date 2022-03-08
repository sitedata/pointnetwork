const PointSDKController = require('./PointSDKController');
const ethereumjs = require('ethereumjs-util');

class WalletController extends PointSDKController {
    constructor(ctx, req, reply) {
        super(ctx);
        this.payload = req.body;
        this.reply = reply;
        this.defaultWallet = this.ctx.blockchain.getWallet();
    }

    async tx() {
        const from = this.defaultWallet.address;
        const to = this.payload.to;
        const value = this.payload.value;

        const receipt = await this.ctx.wallet.sendTransaction(from, to, value);
        const transactionHash = receipt.transactionHash;

        return this._response({transactionHash});
    }

    publicKey() {
        const publicKeyBuffer = ethereumjs.privateToPublic(this.defaultWallet.privateKey);
        const publicKey = ethereumjs.bufferToHex(publicKeyBuffer);

        // return the public key
        return this._response({publicKey});
    }

    address() {
        const address = this.defaultWallet.address;

        // return the public key
        return this._response({address});
    }

    async balance() {
        const balance = (
            await this.ctx.blockchain.getBalance(this.defaultWallet.address)
        ).toString();

        // return the wallet balance
        return this._response({balance});
    }

    hash() {
        const partialPK = this.defaultWallet.privateKey.substr(0, 33);
        const hashBuffer = ethereumjs.sha256(Buffer.from(partialPK));
        const hash = ethereumjs.bufferToHex(hashBuffer);

        return this._response({hash});
    }
}

module.exports = WalletController;

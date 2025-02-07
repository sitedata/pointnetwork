const PointSDKController = require('./PointSDKController');
const open = require('open');

class Web2Controller extends PointSDKController {
    constructor(ctx, req, reply) {
        super(ctx, req, true);
        this.req = req;
        this.host = this.req.headers.host;

        if (!this.host === 'point') return reply.callNotFound();

        this.payload = req.body;
        this.reply = reply;
    }

    async open() {
        if (!this.host === 'point') return reply.callNotFound();
        const url = this.payload.urlToOpen;
        try {
            open(url);
            return this._response(true);
        } catch (e){
            return this._response(false);
        }
        
    }

}

module.exports = Web2Controller;

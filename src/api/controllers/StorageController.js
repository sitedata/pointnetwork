const PointSDKController = require('./PointSDKController');
const File = require('../../db/models/file');
const Chunk = require('../../db/models/chunk');
const DEFAULT_ENCODING = 'utf-8';
const {getFile, uploadFile} = require('../../client/storage');
const config = require('config');
const {FILE_DOWNLOAD_STATUS} = require('../../db/models/file');
const detectContentType = require('detect-content-type');

class StorageController extends PointSDKController {
    constructor(ctx, req) {
        super(ctx, req);

        this.req = req;
        this.config = config.get('zproxy');

        this.payload = req.body;
    }

    async getString() {
        const cid = this.req.params.id;
        const encoding = this.req.query.encoding ?? DEFAULT_ENCODING;

        const contents = (await getFile(cid, encoding)).toString(encoding);
        const contentType = detectContentType(Buffer.from(contents));
        return this._response(contents, {'content-type': contentType});
    }

    async putString() {
        const data = this.payload.data;
        if (data) {
            const id = await uploadFile(data);
            return this._response(id);
        } else {
            return this._response(null);
        }
    }

    // Returns all file metadata stored in the nodes leveldb
    async files() {
        const allFiles = await File.allBy('dl_status', FILE_DOWNLOAD_STATUS.COMPLETED);
        return this._response(
            allFiles.map(({id, originalPath, size}) => ({id, originalPath, size}))
        );
    }

    // Returns a single file metadata stored in the nodes leveldb
    async fileById() {
        const id = this.req.params.id;
        const file = await File.findOrFail(id);
        return this._response(file);
    }

    // Returns a single chunk metadata stored in the nodes leveldb
    async chunkById() {
        const id = this.req.params.id;
        const chunk = await Chunk.findOrFail(id);
        return this._response(chunk);
    }
}

module.exports = StorageController;

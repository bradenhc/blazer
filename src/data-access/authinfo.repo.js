/**
 * @typedef {import('mongodb').Db} DbConnection mongodb.Db
 * @typedef {import('../model/authinfo.model')} AuthInfo module:model.User
 */
const AuthInfo = require('../model/authinfo.model');

const CollectionName = 'auth';

module.exports = class AuthInfoRepository {
    /**
     * Creates a new AuthInfoRepository object.
     *
     * @param {DbConnection} dbConnection The connection to the database.
     */
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    /**
     *
     * @param {AuthInfo} authInfo
     */
    async add(authInfo) {
        let doc = { ...authInfo };
        doc._id = doc.id;
        delete doc.id;
        await this._conn.collection(CollectionName).insertOne(doc);
    }

    /**
     *
     * @param {string} userId
     * @returns {AuthInfo}
     */
    async get(userId) {
        let doc = await this._conn.collection(CollectionName).findOne({ userId: userId });
        if (doc) {
            delete doc._id;
            return Object.create(AuthInfo.prototype, doc);
        }
        return null;
    }

    /**
     *
     * @param {AuthInfo} authInfo
     */
    async update(authInfo) {
        let doc = { ...authInfo };
        await this._conn.collection(CollectionName).updateOne({ userId: authInfo.userId }, { $set: doc });
    }
};

/**
 * @typedef {import('mongodb').Db} DbConnection mongodb.Db
 * @typedef {import('../model/user.model').User} User module:model.User
 */

const CollectionName = 'users';

module.exports = class UsersRepository {
    /**
     * Creates a new UsersRepository object.
     *
     * @param {DbConnection} dbConnection The connection to the database.
     */
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    /**
     *
     * @param {User} user
     */
    async add(user) {
        let doc = { ...user };
        doc._id = doc.id;
        delete doc.id;
        await this._conn.collection(CollectionName).insertOne(doc);
    }

    /**
     *
     * @param {string} id
     * @returns {User}
     */
    async get(id) {
        let doc = await this._conn.collection(CollectionName).findOne({ _id: id });
        if (doc) {
            doc.id = doc._id;
            delete doc._id;
            return doc;
        }
        return null;
    }

    /**
     * @typedef {object} UserQueryOptions
     * @property {string} username
     * 
     * @param {UserQueryOptions} options 
     * @returns {User[]}
     */
    async query(options) {
        let q = {};
        if (options.username) {
            q.username = username;
        }
        let result = await this._conn
            .collection(CollectionName)
            .find({ q })
            .toArray();
        return result;
    }

    /**
     *
     * @param {User} user
     */
    async update(user) {
        let doc = { ...user };
        doc._id = doc.id;
        delete doc.id;
        await this._conn.collection(CollectionName).updateOne({ _id: user.id }, { $set: doc });
    }
};

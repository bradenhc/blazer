/**
 * @typedef {import('mongodb').Db} DbConnection mongodb.Db
 * @typedef {import('../model/blogpost.model').BlogPost} BlogPost module:model.BlogPost
 */

const CollectionName = 'blogposts';

module.exports = class BlogPostsRepository {
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
     * @param {BlogPost} blogPost
     */
    async add(blogPost) {
        let doc = { ...blogPost };
        doc._id = doc.id;
        delete doc.id;
        await this._conn.collection(CollectionName).insertOne(doc);
    }

    /**
     *
     * @typedef {object} BlogPostsQueryOptions
     * @property {string} authorId
     *
     * @param {BlogPostsQueryOptions} options
     */
    async query(options) {
        let q = {};
        if (options.authorId) {
            q.authorId = options.authorId;
        }
        let results = await this._conn
            .collection(CollectionName)
            .find(q)
            .toArray();
        return results.map(r => {
            r.id = r._id;
            delete r._id;
            return r;
        });
    }

    /**
     *
     * @param {string} id
     * @returns {BlogPost}
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
     *
     * @param {BlogPost} blogPost
     */
    async update(blogPost) {
        let doc = { ...blogPost };
        doc._id = doc.id;
        delete doc.id;
        await this._conn.collection(CollectionName).updateOne({ _id: blogPost.id }, { $set: doc });
    }

    async remove(id) {
        await this._conn.collection(CollectionName).deleteOne({ _id: id });
    }
};

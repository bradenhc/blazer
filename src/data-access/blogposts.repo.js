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
     * @param {string} id
     * @returns {BlogPost}
     */
    async get(id) {
        let doc = await this._conn.collection(CollectionName).findOne({ _id: id });
        doc.id = doc._id;
        delete doc._id;
        return doc;
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
};

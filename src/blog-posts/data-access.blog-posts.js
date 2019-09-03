const { ResourceNotFoundError } = require('../error');
const dbConn = require('../database-connection');

const CollectionName = 'blogposts';

module.exports = {
    saveBlogPost: async pipelineData => {
        let doc = { ...pipelineData.blogPost };
        doc._id = doc.id;
        delete doc.id;
        await dbConn.collection(CollectionName).updateOne({ _id: doc._id }, { $set: doc }, { upsert: true });
        return pipelineData;
    },

    getBlogPost: async pipelineData => {
        let id = pipelineData.blogPostId;
        let doc = await dbConn.collection(CollectionName).findOne({ _id: id });
        if (doc) {
            doc.id = doc._id;
            delete doc._id;
            return Object.assign({}, pipelineData, {
                blogPost: doc
            });
        }
        throw ResourceNotFoundError(`Failed to find blog post with ID ${id}`);
    }
};

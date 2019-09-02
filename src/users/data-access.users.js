const { ResourceNotFoundError } = require('../error');
const dbConn = require('../database-connection');

const CollectionName = 'users';

module.exports = {
    saveUser: async pipelineData => {
        let doc = { ...pipelineData.user };
        doc._id = doc.id;
        delete doc.id;
        await dbConn.collection(CollectionName).updateOne({ _id: doc._id }, { $set: doc }, { upsert: true });
        return pipelineData;
    },

    getUser: async pipelineData => {
        let id = pipelineData.userId;
        let doc = await dbConn.collection(CollectionName).findOne({ _id: id });
        if (doc) {
            doc.id = doc._id;
            delete doc._id;
            return Object.assign({}, pipelineData, {
                user: doc
            });
        }
        throw ResourceNotFoundError(`Failed to find user with ID ${id}`);
    },

    getUserByGithubId: async pipelineData => {
        let id = pipelineData.githubId;
        let doc = await dbConn.collection(CollectionName).findOne({ githubId: id });
        if (doc) {
            doc.id = doc._id;
            delete doc._id;
            return Object.assign({}, pipelineData, {
                user: doc
            });
        }
        throw ResourceNotFoundError(`Failed to find user with GitHub ID ${id}`);
    }
};

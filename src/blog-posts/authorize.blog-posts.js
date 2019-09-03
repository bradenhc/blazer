const { ForbiddenError } = require('../error');

module.exports = {
    ensureBlogPostOwnership: async pipelineData => {
        if (pipelineData.blogPost.authorId !== pipelineData.token.sub) {
            throw ForbiddenError();
        }
        return pipelineData;
    }
};

module.exports = {
    prepareBlogPostResponse: status => async pipelineData => ({ body: { ...pipelineData.blogPost }, status })
};

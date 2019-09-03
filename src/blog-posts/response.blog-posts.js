module.exports = {
    prepareBlogPostResponse: status => async pipelineData => {
        let response = { status };
        if (pipelineData.blogPost) {
            response.body = pipelineData.blogPost;
        } else {
            response.body = pipelineData.blogPosts || [];
        }
        return response;
    }
};

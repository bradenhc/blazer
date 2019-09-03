const asyncPipe = require('../async-pipe');
const authorize = require('../authorize');
const transform = require('./request.blog-post');
const { validateCreateRequest, validateUpdateRequest } = require('./validation.blog-posts');
const { createNewBlogPost, updateExistingBlogPost } = require('./model.blog-posts');
const { saveBlogPost, getBlogPost } = require('./data-access.blog-posts');
const { getUser } = require('../users/data-access.users');
const { prepareBlogPostResponse } = require('./response.blog-posts');
const { ensureBlogPostOwnership } = require('./authorize.blog-posts');
const HttpStatus = require('http-status-codes');

module.exports = {
    handleCreateBlogPost: asyncPipe(
        transform,
        authorize('blog-posts:write'),
        validateCreateRequest,
        async pipelineData => Object.assign({}, pipelineData, { userId: pipelineData.token.sub }),
        getUser,
        createNewBlogPost,
        saveBlogPost,
        prepareBlogPostResponse(HttpStatus.CREATED)
    ),

    handleGetSingleBlogPost: asyncPipe(transform, getBlogPost, prepareBlogPostResponse(HttpStatus.OK)),

    handleUpdateSingleBlogPost: asyncPipe(
        transform,
        authorize('blog-posts:write'),
        validateUpdateRequest,
        getBlogPost,
        ensureBlogPostOwnership,
        updateExistingBlogPost,
        saveBlogPost,
        prepareBlogPostResponse(HttpStatus.OK)
    )
};

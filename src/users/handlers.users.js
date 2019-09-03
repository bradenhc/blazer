const asyncPipe = require('../async-pipe');
const transform = require('./request.users');
const authorize = require('../authorize');
const { validateUpdateRequest } = require('./validation.users');
const { updateExistingUser } = require('./model.users');
const { saveUser, getUser } = require('./data-access.users');
const { prepareUserResponse } = require('./response.users');
const { getBlogPostsForAuthor } = require('../blog-posts/data-access.blog-posts');
const { prepareBlogPostResponse } = require('../blog-posts/response.blog-posts');
const HttpStatus = require('http-status-codes');

module.exports = {
    handleGetSingleUser: asyncPipe(transform, getUser, prepareUserResponse(HttpStatus.OK)),

    handleUpdateSingleUser: asyncPipe(
        transform,
        authorize('users:write'),
        validateUpdateRequest,
        getUser,
        updateExistingUser,
        saveUser,
        prepareUserResponse(HttpStatus.OK)
    ),

    handleGetBlogPostsForUser: asyncPipe(transform, getBlogPostsForAuthor, prepareBlogPostResponse(HttpStatus.OK))
};

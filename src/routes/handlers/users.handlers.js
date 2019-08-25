const User = require('../../model/user.model');
const AuthInfo = require('../../model/authinfo.model');
const UsersRepository = require('../../data-access/users.repo');
const AuthInfoRepository = require('../../data-access/authinfo.repo');
const BlogPostsRepository = require('../../data-access/blogposts.repo');
const HttpStatus = require('http-status-codes');
const { ResourceNotFoundError, ForbiddenError } = require('../../error');

module.exports = {
    handleCreateNewUser: async function(ctx) {
        let { firstName, lastName, username, email, password } = ctx.request.body;
        let user = User.create(firstName, lastName, username, email);
        let repo = new UsersRepository(ctx.dbconn);
        await repo.add(user);

        // Generate the password hash for the user
        let info = new AuthInfo(user.id);
        info.setHashWithPassword(password);

        let infoRepo = new AuthInfoRepository(ctx.dbconn);
        await infoRepo.add(info);

        // Send back a token in the response
        let token = await info.generateToken();

        ctx.status = HttpStatus.CREATED;
        ctx.body = { ...user, token };
    },

    handleGetUserById: async function(ctx) {
        let id = ctx.params.id;
        let repo = new UsersRepository(ctx.dbconn);
        let user = await repo.get(id);
        if (!user) {
            throw ResourceNotFoundError(`Could not find user with ID "${id}"`);
        }
        ctx.status = HttpStatus.OK;
        ctx.body = user;
    },

    handleUpdateUser: async function(ctx) {
        // Make sure the person making the request is the user they are trying to update
        let id = ctx.params.id;
        if (id !== ctx.jwt.sub) {
            throw ForbiddenError();
        }

        let repo = new UsersRepository(ctx.dbconn);
        let user = await repo.get(id);

        if (!user) {
            throw ResourceNotFoundError(`Failed to find user with ID ${id} to update`);
        }

        user = { ...user, ...ctx.request.body };
        user.updatedOn = new Date();
        await repo.update(user);
        ctx.status = HttpStatus.OK;
        ctx.body = user;
    },

    handleGetBlogPostsForUser: async function(ctx) {
        let id = ctx.params.id;
        let blogPostsRepo = new BlogPostsRepository(ctx.dbconn);
        let blogPosts = await blogPostsRepo.query({ authorId: id });
        ctx.status = HttpStatus.OK;
        ctx.body = blogPosts;
    }
};

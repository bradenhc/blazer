const HttpStatus = require('http-status-codes');
const BlogPost = require('../../model/blogpost.model');
const BlogPostsRepository = require('../../data-access/blogposts.repo');
const UsersRepository = require('../../data-access/users.repo');
const { RequestValidationError } = require('../../error');

module.exports = {
    handleCreateNewBlogPost: async function(ctx) {
        let { title, summary = null, content, tags = [], authorId, isPublished = false } = ctx.request.body;

        // Verify the author exists
        let usersRepo = new UsersRepository(ctx.dbconn);
        let user = await usersRepo.get(authorId);
        if(!user) {
            throw RequestValidationError(`No user with ID ${authorId} exists`);
        }

        // User exists, add the blog post
        let blogPost = BlogPost.create(title, summary, content, tags, authorId, isPublished);
        if(isPublished) {
            blogPost.publishedOn = new Date();
        }
        let repo = new BlogPostsRepository(ctx.dbconn);
        await repo.add(blogPost);

        // Respond to the client
        ctx.status = HttpStatus.CREATED;
        ctx.body = blogPost;
    },

    handleGetManyBlogPosts: async function(ctx) {
        let repo = new BlogPostsRepository(ctx.dbconn);
        let blogPosts = await repo.query();
        ctx.status = HttpStatus.OK;
        ctx.body = blogPosts;
    
    }
};

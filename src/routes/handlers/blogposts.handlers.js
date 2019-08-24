const HttpStatus = require('http-status-codes');
const BlogPost = require('../../model/blogpost.model');
const BlogPostsRepository = require('../../data-access/blogposts.repo');

module.exports = {
    handleCreateNewBlogPost: async function(ctx) {
        let { title, summary = null, content, tags = [], authorId, isPublished = false } = ctx.request.body;
        let blogPost = BlogPost.create(title, summary, content, tags, authorId, isPublished);
        if(isPublished) {
            blogPost.publishedOn = new Date();
        }
        let repo = new BlogPostsRepository(ctx.dbconn);
        await repo.add(blogPost);
        ctx.status = HttpStatus.CREATED;
        ctx.body = blogPost;
    }
};

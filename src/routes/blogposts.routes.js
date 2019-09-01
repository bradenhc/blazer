const Router = require('@koa/router');
const validators = require('./validation/blogposts.validation');
const handlers = require('./handlers/blogposts.handlers');

const router = new Router();

router.post('/blog-posts', validators.validateCreateRequest, handlers.handleCreateNewBlogPost);
router.get('/blog-posts', handlers.handleGetManyBlogPosts);
router.get('/blog-posts/:id', handlers.handleGetSingleBlogPost);
router.patch('/blog-posts/:id', validators.validateUpdateRequest, handlers.handleUpdateBlogPost);
router.delete('/blog-posts/:id', handlers.handleDeleteBlogPost);

module.exports = router.routes();

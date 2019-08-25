const Router = require('@koa/router');
const validators = require('./validation/blogposts.validation');
const { validateRequestToken } = require('./validation/tokens.validation');
const handlers = require('./handlers/blogposts.handlers');

const router = new Router();

router.post('/blog-posts', validateRequestToken, validators.validateCreateRequest, handlers.handleCreateNewBlogPost);
router.get('/blog-posts', handlers.handleGetManyBlogPosts);
router.get('/blog-posts/:id', handlers.handleGetSingleBlogPost);
router.patch('/blog-posts/:id', validateRequestToken, validators.validateUpdateRequest, handlers.handleUpdateBlogPost);
router.delete('/blog-posts/:id', validateRequestToken, handlers.handleDeleteBlogPost);

module.exports = router.routes();

const Router = require('@koa/router');
const validators = require('./validation/blogposts.validation');
const handlers = require('./handlers/blogposts.handlers');

const router = new Router();

router.post('/blog-posts', validators.validateCreateRequest, handlers.handleCreateNewBlogPost);

module.exports = router.routes();
const Router = require('@koa/router');
const functional = require('../functional-middleware');
const { handleGetSingleUser, handleUpdateSingleUser, handleGetBlogPostsForUser } = require('./handlers.users');

const router = new Router();

router.get('/users/:id', functional(handleGetSingleUser));
router.patch('/users/:id', functional(handleUpdateSingleUser));
router.get('/users/:id/blog-posts', functional(handleGetBlogPostsForUser));

module.exports = router.routes();

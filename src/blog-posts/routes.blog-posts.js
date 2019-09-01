const Router = require('@koa/router');
const functional = require('../functional-middleware');
const { handleCreateBlogPost, handleGetSingleBlogPost, handleUpdateSingleBlogPost } = require('./handlers.blog-posts');

const router = new Router();

router.post('/blog-posts', functional(handleCreateBlogPost));
router.get('/blog-posts/:id', functional(handleGetSingleBlogPost));
router.patch('/blog-posts/:id', functional(handleUpdateSingleBlogPost));

module.exports = router.routes();

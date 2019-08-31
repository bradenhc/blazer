const Router = require('@koa/router');
const functional = require('../functional-middleware');
const { handleCreateNewUser, handleGetSingleUser, handleUpdateSingleUser } = require('./handlers.users');

const router = new Router();

router.post('/users', functional(handleCreateNewUser));
router.get('/users/:id', functional(handleGetSingleUser));
router.patch('/users/:id', functional(handleUpdateSingleUser));

module.exports = router.routes();

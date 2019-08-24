const Router = require('@koa/router');
const handlers = require('./handlers/users.handlers');
const validators = require('./validation/users.validation');

const router = new Router();

router.post('/users', validators.validateCreateRequest, handlers.handleCreateNewUser);
router.get('/users/:id', handlers.handleGetUserById);
router.patch('/users/:id', validators.validateUpdateRequest, handlers.handleUpdateUser);

module.exports = router.routes();

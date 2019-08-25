const Router = require('@koa/router');
const handlers = require('./handlers/tokens.handlers');

const router = new Router();

router.post('/token', handlers.handleTokenRequest);

module.exports = router.routes();

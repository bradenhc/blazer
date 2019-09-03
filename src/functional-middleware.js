/** @typedef {import('koa').Middleware} KoaMiddleware koa.Middleware */

/**
 * Provides an entrypoint for Koa middleware to start an asynchronous functional chain that handles HTTP requests.
 * 
 * @param {function} pipe The asynchronous function that serves at the starting point for the pipeline that provides 
 * functional logic for handling the request.
 * @returns {KoaMiddleware} The middleware function that will handle an HTTP request.
 */
module.exports = pipe => async ctx => {
    const { status, body } = await pipe(ctx);
    ctx.status = status;
    ctx.body = body;
};

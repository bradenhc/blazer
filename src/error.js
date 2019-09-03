/*
 * Provides domain-specific error handling for errors that occur during a response to an HTTP request.
 */
/**intellisense-typedefs
 * @typedef {import('koa')} KoaApp koa
 * @typedef {import('koa').Middleware} KoaMiddleware koa.Middleware
 */
const HttpStatus = require('http-status-codes');

/**
 * Data structure that describes an error in the Blazer Engine.
 */
class BlazerError {
    constructor(type, status, message, details) {
        this.type = type;
        this.status = status;
        this.message = message;
        this.details = details;
    }
}

module.exports = {
    /**
     * Produces an error that indicates an invalid request was made on the resource server.
     * 
     * @param {string} message The message describing the error.
     * @param {string|string[]} details Details about why the request validation failed. Usually this contains an array
     * of reasons for the failure.
     * @returns {BlazerError} A new error with proper HTTP status code, message, and details.
     */
    RequestValidationError: (message, details = null) =>
        new BlazerError('RequestValidationError', HttpStatus.BAD_REQUEST, message, details),

    /**
     * Produces an error that indicates a resource could not be found.
     * 
     * @param {string} message The message describing what resource was not found.
     * @returns {BlazerError} A new error with proper HTTP status code, message, and details.
     */
    ResourceNotFoundError: message => new BlazerError('ResourceNotFoundError', HttpStatus.NOT_FOUND, message, null),

    /**
     * Produces an error indicating the request is not authorized (the server can't determine who the client is).
     * 
     * @returns {BlazerError} A new error with proper HTTP status code, message, and details.
     */
    UnauthorizedError: () =>
        new BlazerError(
            'UnauthorizedError',
            HttpStatus.UNAUTHORIZED,
            'You are not authorized to make this request',
            null
        ),

    /**
     * Produces an error indicating a request is forbidden (the server knows who the client is, but the client does
     * not have the proper permissions).
     * 
     * @returns {BlazerError} A new error with proper HTTP status code, message, and details.
     */
    ForbiddenError: () =>
        new BlazerError('ForbiddenError', HttpStatus.FORBIDDEN, 'You are not allowed to make this request', null),

    /**
     * Registers a middlware component with the Koa application that provides clean error handling and useful
     * error messages to the client.
     * 
     * @param {KoaApp} app The Koa application that will use the error middleware.
     * @returns {KoaMiddleware} The middleware used to handle errors during an HTTP request.
     */
    registerErrorMiddleware: function(app) {
        app.on('error', (err, ctx) => {
            console.log(ctx.request.url);
            console.log(err);
        });

        return async function(ctx, next) {
            try {
                await next();
            } catch (err) {
                ctx.status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
                ctx.body = err;
                app.emit('error', err, ctx);
            }
        };
    }
};

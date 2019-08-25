const HttpStatus = require('http-status-codes');

class BlazerError {
    constructor(type, status, message, details) {
        this.type = type;
        this.status = status;
        this.message = message;
        this.details = details;
    }
}

module.exports = {
    RequestValidationError: (message, details = null) =>
        new BlazerError('RequestValidationError', HttpStatus.BAD_REQUEST, message, details),

    ResourceNotFoundError: message => new BlazerError('ResourceNotFoundError', HttpStatus.NOT_FOUND, message, null),

    UnauthorizedError: () =>
        new BlazerError(
            'UnauthorizedError',
            HttpStatus.UNAUTHORIZED,
            'You are not authorized to make this request',
            null
        ),

    ForbiddenError: () =>
        new BlazerError('ForbiddenError', HttpStatus.FORBIDDEN, 'You are not allowed to make this request', null),

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

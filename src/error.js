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
    RequestValidationError: (message, details) =>
        new BlazerError('RequestValidationError', HttpStatus.BAD_REQUEST, message, details),

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

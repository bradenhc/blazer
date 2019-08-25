const jwt = require('jsonwebtoken');
const { JWT_SIGNING_SECRET, JWT_ISSUER, JWT_AUDIENCE } = require('../../config');
const { RequestValidationError, UnauthorizedError } = require('../../error');

module.exports = {
    validateRequestToken: function(ctx, next) {
        return new Promise((resolve, reject) => {
            const { authorization } = ctx.request.headers;

            if (!authorization) {
                return reject(RequestValidationError('Missing authorization header in request'));
            }

            let authHeaderParts = authorization.split(' ');
            if (authHeaderParts.length != 2) {
                return reject(RequestValidationError('Missing bearer token in request header'));
            }

            let requestToken = authHeaderParts[1];

            jwt.verify(
                requestToken,
                JWT_SIGNING_SECRET,
                {
                    issuer: JWT_ISSUER,
                    audience: JWT_AUDIENCE
                },
                async (err, decoded) => {
                    if (err) {
                        return reject(UnauthorizedError());
                    }
                    ctx.jwt = decoded;
                    try {
                        await next();
                    } catch (err) {
                        return reject(err);
                    }
                    resolve();
                }
            );
        });
    }
};

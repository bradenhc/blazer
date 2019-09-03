const jwt = require('jsonwebtoken');
const { JWT_SIGNING_SECRET, JWT_ISSUER, JWT_AUDIENCE } = require('./config');

const { RequestValidationError, UnauthorizedError } = require('./error');

/**
 * Provides an asynchronous pipeline function for authorization a request based on roles defined in the accompanying
 * access token.
 * 
 * @param {...string} allowedRoles The roles that are required for authorization to pass
 * @returns {function} The asynchronous pipeline function.
 */
module.exports = (...allowedRoles) => pipelineData =>
    new Promise((resolve, reject) => {
        const authorization = pipelineData.tokenRaw;

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

                if (!allowedRoles.some(r => decoded.roles.includes(r))) {
                    return reject(UnauthorizedError());
                }

                resolve(Object.assign({}, pipelineData, { token: decoded }));
            }
        );
    });

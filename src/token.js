/*
 * Contains logic for generating tokens that authorize users to modify data in the system.
 */
const jwt = require('jsonwebtoken');
const { JWT_SIGNING_SECRET, JWT_SIGNING_ALGORITHM, JWT_ISSUER, JWT_AUDIENCE } = require('./config');
const { UnauthorizedError } = require('./error');

/**
 * Generates a JSON Web Token (JWT) with write permissions for resources belonging the the user with the provided
 * GUID.
 * 
 * @param {string} id The GUID of the user who will be the subject of the token.
 * @returns {string} A serialized JSON Web Token.
 */
module.exports = id =>
    new Promise((resolve, reject) => {
        jwt.sign(
            {
                roles: ['users:write', 'blog-posts:write']
            },
            JWT_SIGNING_SECRET,
            {
                algorithm: JWT_SIGNING_ALGORITHM,
                issuer: JWT_ISSUER,
                audience: JWT_AUDIENCE,
                subject: id,
                expiresIn: '24h'
            },
            (err, token) => {
                if (err) {
                    return reject(UnauthorizedError());
                }
                resolve(token);
            }
        );
    });

const jwt = require('jsonwebtoken');
const { JWT_SIGNING_SECRET, JWT_SIGNING_ALGORITHM, JWT_ISSUER, JWT_AUDIENCE } = require('./config');
const { UnauthorizedError } = require('./error');

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

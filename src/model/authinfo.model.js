const crypto = require('crypto');
const { UnauthorizedError } = require('../error');
const jwt = require('jsonwebtoken');
const {
    SALT_SIZE_BYTES,
    HASH_ALGORITHM,
    JWT_SIGNING_SECRET,
    JWT_SIGNING_ALGORITHM,
    JWT_ISSUER,
    JWT_AUDIENCE
} = require('../config');

module.exports = class AuthInfo {
    constructor(userId) {
        this.userId = userId;
        this.salt = crypto.randomBytes(SALT_SIZE_BYTES);
        this.hash = null;
        this.algorithm = HASH_ALGORITHM;
    }

    setHashWithPassword(password) {
        this.hash = this._hash(password);
    }

    async authenticate(password) {
        let check = this._hash(password);

        if (check !== this.hash) {
            throw UnauthorizedError();
        }

        return await this.generateToken();
    }

    _hash(password) {
        let hash = crypto.createHash(this.algorithm);
        hash.update(this.salt).update(password);
        return hash.digest('hex');
    }

    async generateToken() {
        return new Promise((resolve, reject) => {
            jwt.sign(
                {},
                JWT_SIGNING_SECRET,
                {
                    algorithm: JWT_SIGNING_ALGORITHM,
                    issuer: JWT_ISSUER,
                    audience: JWT_AUDIENCE,
                    subject: this.userId,
                    expiresIn: '2h'
                },
                (err, token) => {
                    if (err) {
                        return reject(UnauthorizedError());
                    }
                    resolve(token);
                }
            );
        });
    }
};

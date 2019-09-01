if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const env = (key, defaultValue) => process.env[`BLAZER_${key}`] || defaultValue;

module.exports = {
    // Database connection settings
    DATABASE_URL: env('DATABASE_URL'),
    DATABASE_NAME: env('DATABASE_NAME'),

    // Server settings
    PORT: parseInt(env('PORT', 3000)),
    SILENT_MODE: env('SILENT_MODE') === 'true',

    // Authentication settings
    SALT_SIZE_BYTES: env('SALT_SIZE_BYTES', 16),
    HASH_ALGORITHM: env('HASH_ALGORITHM', 'sha256'),

    JWT_SIGNING_SECRET: env('JWT_SIGNING_SECRET'),
    JWT_ISSUER: env('JWT_ISSUER'),
    JWT_AUDIENCE: env('JWT_AUDIENCE'),
    JWT_SIGNING_ALGORITHM: env('JWT_SIGNING_ALGORITHM', 'HS256'),

    // GitHub Login Settings
    GITHUB_AUTH_URL: env('GITHUB_AUTH_URL'),
    GITHUB_CLIENT_ID: env('GITHUB_CLIENT_ID'),
    GITHUB_CLIENT_SECRET: env('GITHUB_CLIENT_SECRET'),
    GITHUB_REDIRECT_URI: env('GITHUB_REDIRECT_URI'),
    GITHUB_TOKEN_URL: env('GITHUB_TOKEN_URL'),
    GITHUB_API_USER_URL: env('GITHUB_API_USER_URL')
};

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const env = (key, defaultValue) => process.env[`BLAZER_${key}`] || defaultValue;

module.exports = {
    DATABASE_URL: env('DATABASE_URL'),
    DATABASE_NAME: env('DATABASE_NAME'),
    PORT: parseInt(env('PORT', 3000)),
    SILENT_MODE: env('SILENT_MODE') === 'true'
};

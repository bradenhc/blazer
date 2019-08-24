const { MongoClient } = require('mongodb');
const { DATABASE_URL, DATABASE_NAME } = require('../config');

module.exports = async function(ctx, next) {
    const client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    ctx.dbconn = client.db(DATABASE_NAME);
    await next();
};

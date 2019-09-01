/**
 * To reduce the need for dependency injection in our functional programming, we are considering a pool of database
 * connections to be a part of the global application state (something that is simply available to the application
 * at runtime). Functions requiring access to the database will need to include this module and access collections
 * appropriately.
 */
const { MongoClient } = require('mongodb');
const { DATABASE_URL, DATABASE_NAME, DATABASE_POOL_SIZE } = require('./config');

let _pool = null;

const proto = (module.exports = {
    initialize: async () => {
        let client = await MongoClient.connect(DATABASE_URL, {
            poolSize: DATABASE_POOL_SIZE,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        _pool = client.db(DATABASE_NAME);
    },

    close: () => {
        _pool && _pool.close();
        _pool = null;
    },

    collection: name => _pool.collection(name),

    middleware: async (ctx, next) => {
        if (_pool === null) {
            await proto.initialize();
        }
        await next();
    }
});

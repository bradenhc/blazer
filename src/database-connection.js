/*
 * To reduce the need for dependency injection in our functional programming, we are considering a pool of database
 * connections to be a part of the global application state (something that is simply available to the application
 * at runtime). Functions requiring access to the database will need to include this module and access collections
 * appropriately.
 */
/**intellisense-typedefs
 * @typedef {import('mongodb').Db} MongoDb mongodb.Db
 * @typedef {import('mongodb').Collection} MongoCollection mongodb.Collection
 */
const { MongoClient } = require('mongodb');
const { DATABASE_URL, DATABASE_NAME, DATABASE_POOL_SIZE } = require('./config');

/**
 * The connection pool to the database.
 * @type {MongoDb}
 */
let _pool = null;

const proto = (module.exports = {
    /**
     * Initializes a connection pool with the database.
     */
    initialize: async () => {
        let client = await MongoClient.connect(DATABASE_URL, {
            poolSize: DATABASE_POOL_SIZE,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        _pool = client.db(DATABASE_NAME);
    },

    /**
     * Closes the connection pool to the database.
     */
    close: () => {
        _pool && _pool.close();
        _pool = null;
    },

    /**
     * Provides access to a collection within the NoSQL database through one of the connections in the connection
     * pool.
     * 
     * @param {string} name The name of the collection to access.
     * @returns {MongoCollection} An object providing access methods to the database collection.
     */
    collection: name => _pool.collection(name),

    /**
     * Provides a middleware function that will check to see if the database connection pool has been initialized
     * and initialize it if it has not been.
     */
    middleware: async (ctx, next) => {
        if (_pool === null) {
            await proto.initialize();
        }
        await next();
    }
});

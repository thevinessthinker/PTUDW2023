const env = require('./environment');
//const { UserRepository } = require('../db/repositories');

const initOptions = {
    capSQL: true,
    extend(obj, dc) {
        //obj.userRepository = new UserRepository(obj, pgp);
    },
};

const pgp = require('pg-promise')(initOptions);

const db = pgp({
    host: env.DB_HOSTNAME,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
});

const CONNECT_DB = async () => {
    const c = await db.connect();
    c.done();
};

module.exports = { db, pgp, CONNECT_DB };

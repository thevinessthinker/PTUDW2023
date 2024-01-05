require('dotenv').config();

const env = {
    SERVER_HOSTNAME: process.env.SERVER_HOSTNAME,
    SERVER_PORT: process.env.SERVER_PORT,
    DB_HOSTNAME: process.env.DB_HOSTNAME,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    BUILD_MODE: process.env.BUILD_MODE,
};

module.exports = env;

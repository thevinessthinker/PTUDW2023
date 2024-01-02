const express = require('express');
const env = require('./config/environment');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { CONNECT_DB } = require('./config/db');

const START_SERVER = () => {
    const app = express();

    require('./config/view')(app);
    app.use('/static', express.static('src/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get('/', (req, res) => {
        res.send('Hello world');
    });

    const server = https.createServer(
        {
            key: fs.readFileSync(path.join(__dirname, '../_certs/server.key')),
            cert: fs.readFileSync(
                path.join(__dirname, '../_certs/server.cert'),
            ),
        },
        app,
    );
    server.listen(env.SERVER_PORT, env.SERVER_HOSTNAME, () => {
        console.log(
            `3. [OK] Server is running at https://${env.SERVER_HOSTNAME}:${env.SERVER_PORT} `,
        );
    });
};

/////////////////////////////////////
(async () => {
    try {
        console.log('\n1. [...] Connecting to PostgreSQL database');
        CONNECT_DB();
        console.log('2. [OK] Connected to PostgreSQL database');
        START_SERVER();
    } catch (err) {
        console.error('ERROR: ' + err);
    }
})();

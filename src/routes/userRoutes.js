const express = require('express');
const accountController = require('../controllers/accountController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const Router = express.Router();

Router.route('/account/profile').get(ensureAuthenticated, (req, res) => {
    res.send('authenticated');
});

module.exports = Router;

const express = require('express');
const accountController = require('../controllers/accountController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const Router = express.Router();

Router.route('/account/profile').get(ensureAuthenticated, (req, res) => {
    res.send('authenticated');
});
Router.route('/account/create-password').get((req, res) => {
    const email = req.query.email;
    res.render('account/create-password', {
        header: false,
        email,
    });
});

module.exports = Router;

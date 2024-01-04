const express = require('express');

const Router = express.Router();

Router.route('/').get((req, res) => {
    res.render('home');
});

module.exports = Router;

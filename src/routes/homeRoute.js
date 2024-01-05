const express = require('express');

const Router = express.Router();

Router.route('/').get((req, res) => {
    res.render('home', {
        header: true,
    });
});

module.exports = Router;

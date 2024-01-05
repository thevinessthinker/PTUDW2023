const express = require('express');
const homeRoute = require('./homeRoute');
const authRoute = require('./authRoute');
const accountRoute = require('./accountRoute');

const Router = express.Router();

Router.use('/', homeRoute);
Router.use('/auth', authRoute);
Router.use('/account', accountRoute);

module.exports = Router;

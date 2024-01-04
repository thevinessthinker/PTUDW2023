const express = require('express');
const homeRoute = require('./homeRoute');
const authRoute = require('./authRoute');

const Router = express.Router();

Router.use('/', homeRoute);
Router.use('/auth', authRoute);

module.exports = Router;

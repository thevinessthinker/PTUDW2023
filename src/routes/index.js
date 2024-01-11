const express = require('express');
const homeRoute = require('./homeRoute');
const authRoute = require('./authRoute');
const accountRoute = require('./accountRoute');
const userRoute = require('./userRoutes');

const Router = express.Router();

Router.use('/', homeRoute);
Router.use('/auth', authRoute);
Router.use('/account', accountRoute);
Router.use('/user', userRoute);

module.exports = Router;

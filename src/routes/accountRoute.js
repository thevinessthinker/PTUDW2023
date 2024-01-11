const express = require('express');
const accountController = require('../controllers/accountController');
const Router = express.Router();

//////////////////
Router.route('/username-exists').post(accountController.usernameExists);
/////////////////

module.exports = Router;

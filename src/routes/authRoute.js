const express = require('express');
const authController = require('../controllers/authController');
const authValidation = require('../validations/authValidation');
const Router = express.Router();

//////////////////
Router.route('/login').get(authController.loginForm).post(authController.login);
Router.route('/signup')
    .get(authController.signupForm)
    .post(authValidation.signup, authController.signup);
Router.route('/signup/email-confirmation').get(
    authController.handleEmailConfirmation,
);

module.exports = Router;

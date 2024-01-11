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
Router.route('/signup/google').post(
    authValidation.signUpWithGoogle,
    authController.signUpWithGoogle,
);
Router.route('/google').get(authController.loginWithGoogle);
Router.route('/google/callback').get(authController.loginWithGoogleCallback);

module.exports = Router;

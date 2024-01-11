const authService = require('../services/authService');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const loginForm = (req, res) => {
    const errorMessages = req.flash('error');
    const hasError = errorMessages.length > 0;
    if (hasError) {
        errorMessages[0] = 'Thông tin đăng nhập không đúng';
    }
    const { loginKey } = req.query;

    res.render('auth/login', {
        header: false,
        hasError,
        errorMessage: errorMessages[0],
        loginKey,
    });
};
const login = passport.authenticate('myStrategy', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
});

const signupForm = (req, res) => {
    res.render('auth/signup', {
        header: false,
        isSignUp: true,
    });
};
const signup = async (req, res, next) => {
    console.log('Go to AuthController: SignUp');
    try {
        const { username, password, email, name } = req.body;
        await authService.signup(username, password, email, name);

        res.render(`auth/signup`, {
            header: false,
            isSignUp: false,
            email: email,
        });
    } catch (err) {
        next(err);
    }
};
const handleEmailConfirmation = async (req, res) => {
    const { token } = req.query;
    console.log('go to handle email confirmation');

    const rs = await authService.validateVerificationToken(token);

    let isSuccess;
    let status; // [success, warning, dark]
    if (rs === 'valid') {
        isSuccess = true;
        status = 'success';
    } else if (rs === 'expired') {
        isSuccess = false;
        status = 'warning';
    } else {
        isSuccess = false;
        status = 'dark';
    }

    let isWarning;
    if (status === 'warning') {
        isWarning = true;
    } else {
        isWarning = false;
    }

    res.render('auth/email-confirmation', {
        isSuccess,
        status,
        isWarning,
    });
};

const loginWithGoogle = (req, res) => {
    const authorizationURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId =
        '439489644713-bq6fi4hhtrfth6vutqjc1qmsik3kdnu0.apps.googleusercontent.com';
    const redirectURI = 'https://localhost:3000/auth/google/callback';
    const responseType = 'code';
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ];

    const queries = new URLSearchParams({
        response_type: responseType,
        redirect_uri: redirectURI,
        client_id: clientId,
        scope: scopes.join(' '),
    });

    res.json({
        url: `${authorizationURL}?${queries.toString()}`,
    });
};
const loginWithGoogleCallback = async (req, res) => {
    console.log('Go to Google Callback');

    const { code } = req.query;

    const grantType = 'authorization_code';
    const clientId =
        '439489644713-bq6fi4hhtrfth6vutqjc1qmsik3kdnu0.apps.googleusercontent.com';
    const clientSecret = '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';
    const redirectURI = 'https://localhost:3000/auth/google/callback';
    const options = {
        code,
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectURI,
    };

    const rs = await fetch('https://accounts.google.com/o/oauth2/token', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    });

    const data = await rs.json();
    const decodedData = jwt.decode(data.id_token);
    const email = decodedData.email;
    console.log(email);

    res.redirect(`/user/account/create-password?email=${email}`);
};
const signUpWithGoogle = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await authService.signUpWithGoogle(email, password);

        res.redirect(`/auth/login?loginKey=${email}`);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    loginForm,
    login,
    signupForm,
    signup,
    handleEmailConfirmation,
    loginWithGoogle,
    loginWithGoogleCallback,
    signUpWithGoogle,
};

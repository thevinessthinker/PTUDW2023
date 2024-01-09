const authService = require('../services/authService');

const loginForm = (req, res) => {
    res.render('auth/login', {
        header: false,
    });
};

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

module.exports = {
    loginForm,
    signupForm,
    signup,
    handleEmailConfirmation,
};

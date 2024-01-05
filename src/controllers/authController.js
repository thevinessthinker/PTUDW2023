const authService = require('../services/authService');

const loginForm = (req, res) => {
    res.render('auth/login', {
        header: false,
    });
};
// const login = (req, res) => {
//     console.log('Go to AuthController');
//     res.end();
// };
const signupForm = (req, res) => {
    res.render('auth/signup', {
        header: false,
    });
};
const signup = async (req, res, next) => {
    console.log('Go to AuthController: SignUp');
    // invoke signup service

    try {
        const { username, password, email, name } = req.body;
        await authService.signup(username, password, email, name);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    loginForm,
    signupForm,
    signup,
};

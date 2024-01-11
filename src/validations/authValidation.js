const AppError = require('../utils/appError');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { existsByUsername } = require('../services/accountService');

const signup = async (req, res, next) => {
    const { username, password, confirmPassword, email, name } = req.body;
    const allowedCharactersRegex = /^[a-zA-Z0-9.]+$/;
    const onlyNumbersRegex = /^\d+$/;
    const usernameExists = await checkUsernameExists(username);
    const validEmailRegex =
        /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    const usernameRules = [
        {
            condition: username.length === 0,
            message: 'Username is required',
        },
        {
            condition: username.length < 6 || username.length > 30,
            message: 'Username must be between 6 and 30 characters',
        },
        {
            condition: !allowedCharactersRegex.test(username),
            message:
                'Invalid characters. Please use only letters, numbers, and dots',
        },
        {
            condition: onlyNumbersRegex.test(username),
            message:
                'The username must be at least 8 characters long and must include at least one alphabetical character (a-z)',
        },
        {
            condition: usernameExists,
            message: 'Username is already taken',
        },
    ];
    const passwordRules = [
        {
            condition: password.length < 8,
            message: 'Password must be at least 8 characters long',
        },
        {
            condition: confirmPassword.length === 0,
            message: 'Confirm password is required',
        },
        {
            condition: confirmPassword !== password,
            message:
                'The confirmed password does not match the original password',
        },
    ];
    const emailRules = [
        {
            condition: email.length === 0,
            message: 'Email is required',
        },
        {
            condition: !validEmailRegex.test(email),
            message: 'Invalid email format. Please enter a valid email address',
        },
    ];
    const nameRules = [
        {
            condition: name.length === 0,
            message: 'Name is required',
        },
    ];
    const rules = [
        {
            condition:
                !username || !password || !confirmPassword || !email || !name,
            message: 'Something went sideways',
        },
        ...usernameRules,
        ...passwordRules,
        ...emailRules,
        ...nameRules,
    ];

    for (const rule of rules) {
        if (rule.condition) {
            return next(
                new AppError(
                    StatusCodes.UNPROCESSABLE_ENTITY,
                    ReasonPhrases.UNPROCESSABLE_ENTITY,
                    rule.message,
                ),
            );
        }
    }

    next();
};

const signUpWithGoogle = (req, res, next) => {
    const { email, password, confirmPassword } = req.body;

    const passwordRules = [
        {
            condition: password.length < 8,
            message: 'Password must be at least 8 characters long',
        },
        {
            condition: confirmPassword.length === 0,
            message: 'Confirm password is required',
        },
        {
            condition: confirmPassword !== password,
            message:
                'The confirmed password does not match the original password',
        },
    ];

    const rules = [
        {
            condition: !password || !confirmPassword,
            message: 'Something went sideways',
        },
        ...passwordRules,
    ];

    for (const rule of rules) {
        if (rule.condition) {
            return next(
                new AppError(
                    StatusCodes.UNPROCESSABLE_ENTITY,
                    ReasonPhrases.UNPROCESSABLE_ENTITY,
                    rule.message,
                ),
            );
        }
    }
    next();
};

const checkUsernameExists = async (username) => {
    try {
        const rs = await existsByUsername(username);
        return rs;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    signup,
    signUpWithGoogle,
};

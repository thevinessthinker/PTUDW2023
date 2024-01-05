const passwordEncoder = require('../utils/passwordEncoder');
const accountService = require('./accountService');
const AppError = require('../utils/appError');

const signup = async (username, password, email, name) => {
    console.log('GO TO AuthService: Sign Up');
    try {
        const encodedPassword = await passwordEncoder.encode(password);

        const savedAcc = await accountService.create(
            username,
            encodedPassword,
            email,
            name,
        );

        if (!savedAcc) {
            throw new AppError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                'Reigstration failed. Please try again',
            );
        }
    } catch (err) {
        throw err;
    }
};

module.exports = {
    signup,
};

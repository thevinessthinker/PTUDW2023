const accountService = require('../services/accountService');
const AppError = require('../utils/appError');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const usernameExists = async (req, res, next) => {
    const { username } = req.body;
    const exists = await accountService.existsByUsername(username);

    if (exists) {
        return next(
            new AppError(
                StatusCodes.UNPROCESSABLE_ENTITY,
                ReasonPhrases.UNPROCESSABLE_ENTITY,
                'User with this username already exists. Try a different one',
            ),
        );
    }

    res.status(StatusCodes.OK).json({
        message: 'Username is available',
    });

    res.end();
};

module.exports = {
    usernameExists,
};

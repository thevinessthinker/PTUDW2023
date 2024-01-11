const accountService = require('../services/accountService');

const generateUsername = async () => {
    let generatedUsername;
    let isUsernameTaken;

    do {
        const randomString = Math.random().toString(36).substring(7);
        const randomNumbers = Math.floor(Math.random() * 10000);
        generatedUsername = randomString + randomNumbers;

        isUsernameTaken = await accountService.existsByUsername(
            generatedUsername,
        );
    } while (isUsernameTaken);

    return generatedUsername;
};

module.exports = generateUsername;

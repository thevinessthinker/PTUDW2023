const { db } = require('../config/db');
const Account = require('../models/accountModel');
const Roles = require('../config/roles');

const existsByUsername = async (username) => {
    try {
        const rs = await db.accountRepository.existsByUsername(username);
        return rs.exists;
    } catch (err) {
        throw err;
    }
};

const create = async (username, password, email, name) => {
    try {
        const acc = Account.builder()
            .withUsername(username)
            .withPassword(password)
            .withEmail(email)
            .withRole(Roles.USER)
            .build();
        const savedUser = await db.accountRepository.save(acc);
        return savedUser;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    existsByUsername,
    create,
};

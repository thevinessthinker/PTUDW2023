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
        const account = new Account({
            username,
            password,
            email,
            name,
            role: Roles.USER,
        });
        const savedAccount = await db.accountRepository.save(account);
        return savedAccount;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    existsByUsername,
    create,
};

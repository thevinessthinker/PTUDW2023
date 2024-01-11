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

const getAccountByUsername = async (username) => {
    try {
        const rs = await db.accountRepository.findByUsername(username);
        return rs;
    } catch (err) {
        throw err;
    }
};
const getAccountByEmail = async (email) => {
    try {
        const rs = await db.accountRepository.findByEmail(email);
        return rs;
    } catch (err) {
        throw err;
    }
};
const updateAccount = async (account) => {
    try {
        const updatedAccount = await db.accountRepository.update(account);
        return updatedAccount;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    existsByUsername,
    getAccountByUsername,
    create,
    getAccountByEmail,
    updateAccount,
};

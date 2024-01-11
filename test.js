const { db } = require('./src/config/db');
const VerificationToken = require('./src/models/verificationTokenModel');
const Account = require('./src/models/accountModel');
const { randomUUID } = require('crypto');
const authService = require('./src/services/authService');
const crypto = require('crypto');
const accountService = require('./src/services/accountService');
const { c, update } = require('tar');

(async () => {
    const account = await accountService.getAccountByUsername('vcaxy85198');
    account.enabled = true;
    const updatedAccount = await accountService.updateAccount(account);
    console.log(updatedAccount);
})();

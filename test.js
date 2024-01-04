const { db } = require('./src/config/db');
const Account = require('./src/models/accountModel');

(async () => {
    try {
        const del = await db.accountRepository.findById(
            '57606033-4a17-41f7-8604-c4aab4baa290',
        );
        console.log(del);
    } catch (err) {
        console.error(err);
    }
})();

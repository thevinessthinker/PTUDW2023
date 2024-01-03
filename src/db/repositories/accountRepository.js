const CrudRepository = require('./crudRepository');
const cs = {};
const tableName = 'accounts';

class AccountRepository extends CrudRepository {
    constructor(db, pgp) {
        super(db, pgp, tableName, createColumnsets);
    }

    findByUsername(username) {
        return this.db.oneOrNone(
            `SELECT * FROM ${this.tableName} WHERE username = $1`,
            [username],
        );
    }
    findByEmail(email) {
        return this.db.oneOrNone(
            `SELECT * FROM ${this.tableName} WHERE email = $1`,
            [email],
        );
    }
    existsByUsername(username) {
        return this.db.oneOrNone(
            `SELECT EXISTS (SELECT 1 FROM ${this.tableName} WHERE username = $1)`,
            [username],
        );
    }
}

function createColumnsets(pgp) {
    if (!cs.insert) {
        const table = new pgp.helpers.TableName({
            table: 'accounts',
            schema: 'public',
        });
        cs.insert = new pgp.helpers.ColumnSet(
            ['username', 'password', 'email', 'role'],
            { table },
        );
        cs.update = cs.insert.extend(['?id']);
    }
    return cs;
}

module.exports = AccountRepository;

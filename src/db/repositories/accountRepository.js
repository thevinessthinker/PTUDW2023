const cs = {};
const tableName = 'accounts';

class AccountRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        createColumnsets(pgp);
    }

    save(entity) {
        const transformedEntity = {
            username: entity.username,
            password: entity.password,
            email: entity.email,
            role: entity.role,
        };
        const insertQuery =
            this.pgp.helpers.insert(transformedEntity, null, 'accounts') +
            ' RETURNING id';

        return this.db.one(insertQuery);
    }
    existsByUsername(username) {
        return this.db.oneOrNone(
            `SELECT EXISTS (SELECT 1 FROM accounts WHERE username = $1)`,
            [username],
        );
    }
    findById(id) {
        return this.db.oneOrNone(`SELECT * FROM accounts WHERE id = $1`, [id]);
    }
    findByEmail(email) {
        return this.db.oneOrNone(`SELECT * FROM accounts WHERE email = $1`, [
            email,
        ]);
    }
    findByUsername(username) {
        return this.db.oneOrNone(`SELECT * FROM accounts WHERE username = $1`, [
            username,
        ]);
    }
    update(entity) {
        const updateQuery =
            this.pgp.helpers.update(entity, null, 'accounts') +
            ' WHERE id = $1 RETURNING id';

        return this.db.one(updateQuery, entity.id);
    }
}

function createColumnsets(pgp) {
    if (!cs.insert) {
        const table = new pgp.helpers.TableName({
            table: tableName,
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

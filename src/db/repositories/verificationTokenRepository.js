const cs = {};
const tableName = 'verification_tokens';

class VerificationTokenRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        createColumnsets(pgp);
    }

    save(entity) {
        const transformedEntity = {
            token: entity.token,
            account_id: entity.account_id,
            expiry_date: entity.expiry_date,
        };

        const insertQuery =
            this.pgp.helpers.insert(
                transformedEntity,
                null,
                'verification_tokens',
            ) + ' RETURNING id';

        return this.db.one(insertQuery);
    }
    findByToken(token) {
        return this.db.oneOrNone(
            `SELECT * FROM verification_tokens WHERE token = $1`,
            [token],
        );
    }
    delete(entity) {
        const deleteQuery = `DELETE FROM verification_tokens WHERE id = $1 RETURNING *`;
        return this.db.result(deleteQuery, [entity.id]); // get affected rows
        // get deleted row(s): db.oneOrNone, db.manyOrNone
    }
}

function createColumnsets(pgp) {
    if (!cs.insert) {
        const table = new pgp.helpers.TableName({
            table: tableName,
            schema: 'public',
        });
        cs.insert = new pgp.helpers.ColumnSet(
            ['token', 'account_id', 'expiry_date'],
            { table },
        );
        cs.update = cs.insert.extend(['?id']);
    }
    return cs;
}

module.exports = VerificationTokenRepository;

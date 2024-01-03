class CrudRepository {
    constructor(db, pgp, tableName, createColumnsets) {
        this.db = db;
        this.pgp = pgp;
        this.tableName = tableName;

        createColumnsets(pgp);
    }

    count() {
        return this.db.one(
            `SELECT COUNT(*) FROM ${this.tableName}`,
            [],
            (a) => +a.count,
        );
    }
    deleteAll() {
        return this.db.result(`DELETE FROM ${this.tableName}`);
    }
    deleteById(id) {
        return this.db.result(`DELETE FROM ${this.tableName} WHERE id = $1`, [
            id,
        ]);
    }
    existsById(id) {
        return this.db.oneOrNone(
            `SELECT EXISTS (SELECT 1 FROM ${this.tableName} WHERE id = $1)`,
            [id],
        );
    }

    findAll() {
        return this.db.any(`SELECT * FROM ${this.tableName}`);
    }
    findById(id) {
        return this.db.oneOrNone(
            `SELECT * FROM ${this.tableName} WHERE id = $1`,
            [id],
        );
    }
    save(entity) {
        return this.db.one(
            this.pgp.helpers.insert(entity, null, this.tableName) +
                ' RETURNING id',
        );
    }
}

module.exports = CrudRepository;

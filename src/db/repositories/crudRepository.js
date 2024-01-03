const removeUndefinedProperties = require('../../utils/removeUndefinedProperties');

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
        const transformedEntity = transformEntity(entity);

        const query =
            this.pgp.helpers.insert(transformedEntity, null, this.tableName) +
            ' RETURNING id';

        return this.db.one(query);
    }
    update(entity) {
        const transformedEntity = transformEntity(entity);

        const query =
            this.pgp.helpers.update(transformedEntity, null, this.tableName) +
            ' WHERE id = $1 RETURNING id';
        return this.db.one(query, [transformedEntity.id]);
    }
}

function transformEntity(entity) {
    const transformedEntity = { ...entity.self };

    if (transformedEntity.createdAt) {
        transformedEntity.created_at = transformedEntity.createdAt;
        delete transformedEntity.createdAt;
    }

    if (transformedEntity.updatedAt) {
        transformedEntity.updated_at = transformedEntity.updatedAt;
        delete transformedEntity.updatedAt;
    }

    return removeUndefinedProperties(transformedEntity);
}

module.exports = CrudRepository;

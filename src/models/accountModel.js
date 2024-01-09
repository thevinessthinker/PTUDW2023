class Account {
    constructor({
        id,
        username,
        password,
        email,
        name,
        dob,
        role,
        created_at,
        updated_at,
        enabled,
    }) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.dob = dob;
        this.role = role;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.enabled = enabled;
    }
}
module.exports = Account;

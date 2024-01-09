class VerificationToken {
    constructor({
        id,
        token,
        account_id,
        expiry_date,
        created_at,
        updated_at,
    }) {
        this.id = id;
        this.token = token;
        this.account_id = account_id;
        this.expiry_date = expiry_date;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static calculateExpiryDate(expiryTimeInMinutes) {
        const currentDate = new Date();
        const expiryDate = new Date(currentDate);
        expiryDate.setMinutes(
            currentDate.getMinutes() + VerificationToken.EXPIRATION,
        );
        return expiryDate;
    }
}

module.exports = VerificationToken;

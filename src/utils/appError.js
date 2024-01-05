module.exports = class AppError extends Error {
    constructor(statusCode, reasonPhrase, reason) {
        super();
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.reasonPhrase = reasonPhrase;
        this.message = reason;
        this.timestamp = new Date().toUTCString();
        Error.captureStackTrace(this, this.constructor);
    }
};

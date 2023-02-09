class AppError extends Error {
    constructor (errorObject) {
        super();
        this.message = errorObject.message;
        this.statusCode = errorObject.statusCode;
    }
}

module.exports = AppError;
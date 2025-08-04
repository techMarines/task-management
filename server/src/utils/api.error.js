export class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", error = {}) {
        if (!statusCode || !Number.isInteger(statusCode))
            throw new Error("ApiError requires an integer statusCode");
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}

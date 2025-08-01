export default class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", error = {}) {
        if (!statusCode) throw new Error("ApiError requires a statusCode");
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}

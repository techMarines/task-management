export class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", additionalInfo = {}) {
        if (!statusCode || !Number.isInteger(statusCode)) throw new Error("ApiError requires an integer statusCode");
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.additionalInfo = additionalInfo;
    }
}

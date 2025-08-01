export default class ApiResponse {
    constructor(statusCode, data = "", message = "success") {
        if (!statusCode) throw new Error("ApiResponse requires a statusCode");
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300; // status codes in range 2xx indicate success
    }
}

export class ApiResponse {
    constructor(statusCode, data = {}, message = "success") {
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300; // status codes in range 2xx indicate success
    }
}

import apiClient from "#config/api";

export async function login(userName, password) {
    try {
        const response = await apiClient.post(`auth/login`, {
            userName: userName,
            password: password,
        });

        return response.data;
    } catch (err) {
        // On failure, return a structured error object
        // err.response.data contains the error payload from the server
        return err.response.data || "Login failed";
    }
}

export async function register(userName, password) {
    try {
        const response = await apiClient.post(`auth/register`, {
            userName: userName,
            password: password,
        });

        return response.data;
    } catch (err) {
        return err.response.data || "Sign up failed";
    }
}

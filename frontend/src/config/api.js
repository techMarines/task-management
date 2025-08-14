import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/",
});

// Request Interceptor: Adds the JWT to every protected request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;

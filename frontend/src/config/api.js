import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/",
    withCredentials: true, // for cookies
});

export default apiClient;

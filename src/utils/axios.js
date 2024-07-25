import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        common: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
});

export default apiClient
import apiClient from "@/utils/axios.js";

export const register = async (name, email, password) => {
    return await apiClient.post('/register', {
        name: name,
        email: email,
        password: password
    })
}
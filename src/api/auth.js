import apiClient from "@/utils/axios.js";

export const login = async (email, password) => {
    return await apiClient.post('/login', {
        email: email,
        password: password
    })
}

export const logout = async () => {
    return await apiClient.post('/logout')
}
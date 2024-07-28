import apiClient from "@/utils/axios.js";

export const storeChecks = async (formData) => {
    return await apiClient.post('/api/checks', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
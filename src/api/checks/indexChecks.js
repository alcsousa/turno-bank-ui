import apiClient from "@/utils/axios.js";

export const indexChecks = async () => {
    const response = await apiClient.get('/api/checks')

    return response.data
}
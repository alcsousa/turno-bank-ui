import apiClient from "@/utils/axios.js";

export const getAccount = async () => {
    const response = await apiClient.get(
        '/api/accounts/user'
    )

    return response.data
}
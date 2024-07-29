import apiClient from "@/utils/axios.js";

export const indexTransactions = async (page) => {
    const response = await apiClient.get(`/api/transactions?page=${page}`)

    return response.data
}
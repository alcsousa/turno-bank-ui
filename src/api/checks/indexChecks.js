import apiClient from "@/utils/axios.js";

export const indexChecks = async (status, page) => {
    const response = await apiClient.get(`/api/checks?status=${status}&page=${page}`)

    return response.data
}
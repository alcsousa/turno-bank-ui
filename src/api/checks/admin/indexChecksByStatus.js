import apiClient from "@/utils/axios.js";

export const indexChecksByStatus = async (status, page) => {
    const response = await apiClient.get(
        `/api/admin/checks?status=${status}&page=${page}`
    )

    return response.data
}
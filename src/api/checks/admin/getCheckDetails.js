import apiClient from "@/utils/axios.js";

export const getCheckDetails = async (check_id) => {
    const response = await apiClient.get(
        `/api/admin/checks/${check_id}`
    )

    return response.data
}
import apiClient from "@/utils/axios.js";

export const storeCheckEvaluation = async (checkId, isAccepted) => {
    return await apiClient.post(`/api/admin/checks/${checkId}/evaluate`, {
        is_accepted: isAccepted
    })
}
import apiClient from "@/utils/axios.js";

export const storePurchase = async (amount, description) => {
    return await apiClient.post(`/api/purchases`, {
        amount: amount,
        description: description
    })
}
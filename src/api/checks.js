import apiClient from "@/utils/axios.js";

export const depositCheck = async (amount, description, image) => {
    let formData = new FormData()
    formData.append('amount', amount)
    formData.append('description', description)
    formData.append('image', image)

    return await apiClient.post('/api/checks', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
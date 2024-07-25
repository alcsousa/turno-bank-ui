import apiClient from "@/utils/axios.js";

export async function getCsrfCookie() {
    await apiClient.get('/sanctum/csrf-cookie')
}
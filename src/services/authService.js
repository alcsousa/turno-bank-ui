import { useAuthStore } from "@/stores/auth.js";
import { getCsrfCookie } from "@/api/csrf.js";
import { login, logout } from "@/api/auth.js";

export const useAuthService = () => {
    const authStore = useAuthStore()

    const loginUser = async (email, password) => {
        await getCsrfCookie()
        const response = await login(email, password)
        authStore.setUserData(response.data)
    }

    const logoutUser = async () => {
        authStore.clearUserData()
        await getCsrfCookie()
        await logout()
    }

    return {
        loginUser,
        logoutUser
    }
}
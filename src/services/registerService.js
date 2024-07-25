import { getCsrfCookie } from "@/api/csrf.js";
import { register } from "@/api/register.js";
import { useAuthStore } from "@/stores/auth.js";

export const useRegisterService = () => {
    const authStore = useAuthStore()

    const registerUser = async (name, email, password) => {
        await getCsrfCookie()
        const response = await register(name, email, password)
        authStore.setUserData(response.data)
    }

    return {
        registerUser
    }
}
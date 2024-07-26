import {getCsrfCookie} from "@/api/csrf.js";
import {storeCheck} from "@/api/checks.js";

export const useCheckService = () => {
    const depositCheck = async (amount, description, image) => {
        let formData = new FormData()
        formData.append('amount', amount)
        formData.append('description', description)
        formData.append('image', image)

        await getCsrfCookie()
        await storeCheck(formData)
    }

    return {
        depositCheck
    }
}
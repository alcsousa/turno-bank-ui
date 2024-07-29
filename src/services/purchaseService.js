import {getCsrfCookie} from "@/api/csrf.js";
import {storePurchase} from "@/api/purchase/makePurchase.js";

export const useMakePurchase = () => {
    const makePurchase = async (amount, description) => {
        await getCsrfCookie()
        await storePurchase(amount, description)
    }

    return {
        makePurchase
    }
}
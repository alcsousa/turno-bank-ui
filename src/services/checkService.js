import {getCsrfCookie} from "@/api/csrf.js";
import {storeChecks} from "@/api/checks/storeChecks.js";
import {storeCheckEvaluation} from "@/api/checks/admin/storeCheckEvaluation.js";

export const useDepositCheck = () => {
    const depositCheck = async (amount, description, image) => {
        let formData = new FormData()
        formData.append('amount', amount)
        formData.append('description', description)
        formData.append('image', image)

        await getCsrfCookie()
        await storeChecks(formData)
    }

    return {
        depositCheck
    }
}

export const useEvaluateCheck = () => {
    const evaluateCheck = async (checkId, isAccepted) => {
        await getCsrfCookie()
        await storeCheckEvaluation(checkId, isAccepted)
    }

    return {
        evaluateCheck
    }
}

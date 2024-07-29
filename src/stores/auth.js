import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: useLocalStorage('isAuthenticated', false),
        user: useLocalStorage('user', {})
    }),
    actions: {
        setUserData(user) {
            this.isAuthenticated = true
            this.user = user
        },
        clearUserData() {
            this.isAuthenticated = false
            this.user = {}
        }
    },
    getters: {
        isUserLoggedIn: (state) => state.isAuthenticated,
        isAdminUser: (state) => state.user.is_admin
    }
})
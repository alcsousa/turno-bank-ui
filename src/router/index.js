import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from "@/views/AboutView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/restricted/DashboardView.vue";
import {useAuthStore} from "@/stores/auth.js";
import CheckHistoryView from "@/views/restricted/Checks/CheckHistoryView.vue";
import CheckDepositView from "@/views/restricted/Checks/CheckDepositView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/checks',
      name: 'checkHistory',
      component: CheckHistoryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/check/deposit',
      name: 'checkDeposit',
      component: CheckDepositView,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !useAuthStore().isUserLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

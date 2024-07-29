import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/restricted/DashboardView.vue";
import {useAuthStore} from "@/stores/auth.js";
import CheckHistoryView from "@/views/restricted/Checks/CheckHistoryView.vue";
import CheckDepositView from "@/views/restricted/Checks/CheckDepositView.vue";
import CheckControlListView from "@/views/restricted/Admin/CheckControlListView.vue";
import CheckControlDetailView from "@/views/restricted/Admin/CheckControlDetailView.vue";
import PurchaseView from "@/views/restricted/Purchase/PurchaseView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
      meta: { requiresAuth: false, requiresAdmin: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false, requiresAdmin: false }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false, requiresAdmin: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, requiresAdmin: false }
    },
    {
      path: '/checks',
      name: 'checkHistory',
      component: CheckHistoryView,
      meta: { requiresAuth: true, requiresAdmin: false }
    },
    {
      path: '/check/deposit',
      name: 'checkDeposit',
      component: CheckDepositView,
      meta: { requiresAuth: true, requiresAdmin: false }
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: PurchaseView,
      meta: { requiresAuth: true, requiresAdmin: false }
    },
    {
      path: '/admin/check-control',
      name: 'checkControlList',
      component: CheckControlListView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/check-control/:id',
      name: 'checkControlDetail',
      component: CheckControlDetailView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !useAuthStore().isUserLoggedIn) {
    next({ name: 'login' })
  } else if (
      to.meta.requiresAdmin && !useAuthStore().isAdminUser) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
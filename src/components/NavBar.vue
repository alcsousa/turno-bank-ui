<script setup>
import {RouterLink, useRouter} from "vue-router";
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import {useAuthService} from "@/services/authService.js";

const router = useRouter()
const showMobileMenu = ref(false)
const auth = useAuthStore()
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}
const { logoutUser } = useAuthService()
const handleLogout = () => {
  logoutUser()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
    <div class="flex-1 flex justify-between items-center">
      <a href="#" class="text-xl">TurnoBank</a>
    </div>

    <label for="menu-toggle" class="pointer-cursor md:hidden block" @click="toggleMobileMenu">
      <svg class="fill-current text-gray-900"
           xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <title>menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </label>

    <div :class="{hidden: !showMobileMenu}" class="md:flex md:items-center md:w-auto w-full" id="menu">
      <nav>
        <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
          <li><RouterLink to="/" class="md:p-4 py-3 px-0 block">Home</RouterLink></li>
          <li><RouterLink to="/about" class="md:p-4 py-3 px-0 block">About</RouterLink></li>
          <template v-if="!auth.isUserLoggedIn">
            <li><RouterLink to="/register" class="md:p-4 py-3 px-0 block">Register</RouterLink></li>
            <li><RouterLink to="/login" class="md:p-4 py-3 px-0 block">Login</RouterLink></li>
          </template>
          <template v-else>
            <li><RouterLink to="/dashboard" class="md:p-4 py-3 px-0 block">Dashboard</RouterLink></li>
            <li><RouterLink to="/checks" class="md:p-4 py-3 px-0 block">Checks</RouterLink></li>
            <li><a href="#" class="md:p-4 py-3 px-0 block" @click="handleLogout">Logout</a></li>
          </template>
        </ul>
      </nav>
    </div>
  </header>
</template>
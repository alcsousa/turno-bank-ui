<script setup>
import {ref} from "vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import {useRouter} from "vue-router";
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import BaseHeading3 from "@/components/ui/headings/BaseHeading3.vue";
import {useRegisterService} from "@/services/registerService.js";

const router = useRouter()
const error = ref('')
const { registerUser } = useRegisterService()
const form = ref({
  name: null,
  email: null,
  password: null
})

const handleSubmit = async () => {
  try {
    await registerUser(
        form.value.name,
        form.value.email,
        form.value.password
    )
    await router.push({ name: 'dashboard' })
  } catch (err) {
    error.value = err
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
      <BaseHeading3 title="Create a new account"/>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <DangerAlert :error="error"/>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">Name</label>
          <input type="text" v-model="form.name" class="w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300">
        </div>

        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">Email</label>
          <input type="text" v-model="form.email" class="w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300">
        </div>

        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">Password</label>
          <input type="password" v-model="form.password" class="w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300">
        </div>

        <PrimaryButton text="Create account" />
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <RouterLink to="/login" class="font-semibold leading-6 text-blue-600 hover:text-indigo-500">Log in</RouterLink>
      </p>
    </div>
  </div>
</template>

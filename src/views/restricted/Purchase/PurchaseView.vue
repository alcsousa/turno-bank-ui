<script setup>
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import {ref} from "vue";
import CurrencyInput from "@/components/ui/form/CurrencyInput.vue";
import {useRouter} from "vue-router";
import {useMakePurchase} from "@/services/purchaseService.js";

const router = useRouter()
const error = ref('')
const form = ref({
  amount: 0,
  description: ''
})
const { makePurchase } = useMakePurchase()

const handleSubmit = async () => {
  try {
    await makePurchase(
        form.value.amount,
        form.value.description
    )
    await router.push({ name: 'dashboard' })
  } catch (err) {
    error.value = err
  }
}
</script>

<template>
  <AuthenticatedLayout title="Purchase">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <DangerAlert :error="error"/>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">Amount</label>
          <CurrencyInput v-model="form.amount" />
        </div>

        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">Description</label>
          <input type="text" v-model="form.description" class="w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300">
        </div>

        <PrimaryButton text="Purchase" />
      </form>
    </div>
  </AuthenticatedLayout>
</template>
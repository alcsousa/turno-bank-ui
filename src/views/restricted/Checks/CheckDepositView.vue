<script setup>
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import {ref} from "vue";
import CurrencyInput from "@/components/ui/form/CurrencyInput.vue";
import {depositCheck} from "@/api/checks.js";
import {useRouter} from "vue-router";

const router = useRouter()
const error = ref('')
const form = ref({
  amount: 0,
  description: null,
  image: null
})

const handleSubmit = async () => {
  try {
    console.log(form.value);
    await depositCheck(
        form.value.amount,
        form.value.description,
        form.value.image
    )
    await router.push({ name: 'checkHistory' })
  } catch (err) {
    error.value = err
  }
}

const previewImage = ref('');
const handleImage = (event) => {
  form.value.image = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(form.value.image);
  reader.onload = (e) => {
    previewImage.value = e.target.result;
  }
}
</script>

<template>
  <AuthenticatedLayout title="Check Deposit">
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

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input">Upload check image</label>
          <input type="file" @change="handleImage" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input">
          <p class="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div>

        <div>
          <img v-if="previewImage" :src="previewImage" class="mx-auto">
        </div>

        <PrimaryButton text="Deposit" />
      </form>
    </div>

  </AuthenticatedLayout>
</template>

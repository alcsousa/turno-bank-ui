<script setup>
import { useCurrencyInput } from "vue-currency-input";

defineProps({
  modelValue: {
    type: Number,
    required: true
  }
})

const { inputRef } = useCurrencyInput({ currency: 'USD', precision: 2 });
</script>

<template>
  <input ref="inputRef" type="text" class="w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300" />
</template>

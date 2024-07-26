<script setup>
import { defineProps } from 'vue';

defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  buttonClass: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <RouterLink :to="to" :class="buttonClass" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase">
    <slot></slot>
  </RouterLink>
</template>
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
  <RouterLink
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase"
      :to="to"
      :class="buttonClass"
  >
    <slot></slot>
  </RouterLink>
</template>
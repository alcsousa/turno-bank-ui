<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h2 class="text-4xl leading-9 tracking-tight text-gray-900 mb-3 font-extrabold">
    {{ title }}
  </h2>
</template>
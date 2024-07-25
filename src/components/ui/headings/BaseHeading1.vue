<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h1 class="text-5xl leading-9 tracking-tight text-gray-900 mb-3 font-extrabold">
    {{ title }}
  </h1>
</template>
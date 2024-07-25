<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h3 class="text-3xl leading-9 tracking-tight text-gray-900 mb-3 font-extrabold">
    {{ title }}
  </h3>
</template>
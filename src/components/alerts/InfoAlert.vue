<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-blue-300 text-blue-900 px-4 py-4 rounded-md my-4">
    {{ message }}
  </div>
</template>
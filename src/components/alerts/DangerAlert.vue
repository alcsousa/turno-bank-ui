<script setup>
defineProps({
  error: {
    required: true
  },
  response: {
    required: false
  }
})
</script>

<template>
  <div class="bg-red-300 text-red-900 px-4 py-4 rounded-md my-4" v-if="error">
    <ul v-if="error.response.data.errors !== undefined">
      <li v-for="(err, index) in error.response.data.errors" :key="index">
        {{ err[0] }}
      </li>
    </ul>
    <div v-else>
      {{ error.response.data.message }}
    </div>
  </div>
</template>
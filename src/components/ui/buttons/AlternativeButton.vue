<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>


<template>
  <div class="flex flex-col items-center mb-6" v-show="enabled">
    <button
        type="button"
        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-500 focus:z-10 focus:ring-4 focus:ring-gray-100"
    >
      {{ text }}
    </button>
  </div>
</template>
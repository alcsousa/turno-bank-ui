<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li class="py-3 sm:py-4 px-4">
    <div class="flex items-center space-x-4">
      <div class="flex-1 min-w-0">
        <p class="text-sm text-gray-500 truncate">
          {{ title }}
        </p>
        <p class="text-sm font-medium text-gray-900 truncate">
          {{ description }}
        </p>
      </div>
    </div>
  </li>
</template>
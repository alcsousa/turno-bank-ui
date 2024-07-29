<script setup>
defineProps({
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  hasHoverEffect: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <li :class="{
    'py-3 sm:py-4 px-4': true,
    'hover:bg-gray-200 cursor-pointer': hasHoverEffect
  }">
    <div class="flex items-center space-x-4">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">
          {{  description }}
        </p>
        <p class="text-sm text-gray-500 truncate">
          {{ date }}
        </p>
      </div>
      <div :class="{
        'inline-flex items-center text-base font-semibold text-gray-900': true,
        'text-red-500': amount < 0
      }">
        {{ amount }} USD
      </div>
    </div>
  </li>
</template>
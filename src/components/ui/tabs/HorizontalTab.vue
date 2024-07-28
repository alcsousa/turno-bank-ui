<script setup>
defineProps({
  tabOptions: {
    type: Array,
    required: true
  },
  currentTabOption: {
    type: String,
    required: true
  }
})

const emit = defineEmits([
  'update:currentTabOptionChange'
])

const setCurrentTabOption = (option) => {
  emit('update:currentTabOptionChange', option)
}
</script>

<template>
  <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mt-4">
    <ul class="flex flex-wrap">
      <li v-for="option in tabOptions" :key="option" class="me-2">
        <a href="#"
           :class="[
                 'inline-block p-4 border-b-2 rounded-t-lg',
                 currentTabOption === option
                 ? 'text-blue-600 border-blue-600'
                 : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
             ]"
           @click.prevent="setCurrentTabOption(option)"
        >
          {{ option }}
        </a>
      </li>
    </ul>
  </div>
</template>
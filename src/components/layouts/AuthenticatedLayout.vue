<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="wrapper">
    <header class="bg-blue-500 shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mb-4">
        <h2 class="font-semibold text-xl text-white leading-tight bg-red">{{ title }}</h2>
      </div>
    </header>

    <main class="px-6">
      <slot/>
    </main>
  </div>
</template>

<style scoped>

</style>
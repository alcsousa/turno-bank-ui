<script>
export default {
  props: ['error']
}
</script>

<template>
  <div class="bg-red-300 text-red-900 px-4 py-4 rounded-md mb-4" v-if="error">
    <ul v-if="error.response.data.errors !== null">
      <li v-for="(err, index) in error.response.data.errors" :key="index">
        {{ err[0] }}
      </li>
    </ul>
    <div v-else>
      {{ error.message }}
    </div>
  </div>
</template>

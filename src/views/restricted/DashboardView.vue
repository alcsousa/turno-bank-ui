<script setup>
import BaseHeading1 from "@/components/ui/headings/BaseHeading1.vue";
import {useAuthStore} from "@/stores/auth.js";

const auth = useAuthStore()
</script>

<template>
  <div class="m-5">
    <BaseHeading1 title="Welcome!" />
  </div>

  <div class="m-5 p-5 rounded-md shadow">
    <div class="text-base font-semibold">{{ auth.user.name }}</div>
    <div>{{ auth.user.email }}</div>
  </div>
</template>

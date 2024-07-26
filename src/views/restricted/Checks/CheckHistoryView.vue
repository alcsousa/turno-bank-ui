<script setup>
import ButtonLink from "@/components/ui/buttons/ButtonLink.vue";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
</script>

<template>
  <AuthenticatedLayout title="Checks">
    <ButtonLink to="/check/deposit">Make a Deposit</ButtonLink>

    <div class="my-4">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet atque beatae consectetur corporis dicta dolorum eveniet iste itaque magni, minus natus, necessitatibus nesciunt possimus quis quo sit unde voluptas voluptatibus.</p>
    </div>
  </AuthenticatedLayout>
</template>

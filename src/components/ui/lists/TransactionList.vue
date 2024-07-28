<script setup>
import TransactionListItem from "@/components/ui/lists/TransactionListItem.vue";

defineProps({
  transactions: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="my-4 divide-y divide-gray-300">
    <ul v-for="transaction in transactions" :key="transaction.id">
      <TransactionListItem
          :description="transaction.description"
          :date="transaction.created_at"
          :amount="transaction.amount"
      />
    </ul>
  </div>
</template>
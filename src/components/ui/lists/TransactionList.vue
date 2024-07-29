<script setup>
import TransactionListItem from "@/components/ui/lists/TransactionListItem.vue";

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  },
  onItemClick: {
    type: Function,
    required: false
  },
  hasHoverEffect: {
    type: Boolean,
    required: false,
    default: false
  }
})

const handleClick = (transaction) => {
  if (props.onItemClick) {
    props.onItemClick(transaction)
  }
}
</script>

<template>
  <div class="my-4 divide-y divide-gray-300">
    <ul v-for="transaction in transactions" :key="transaction.id">
      <TransactionListItem
          :key="transaction.id"
          :description="transaction.description"
          :date="transaction.created_at"
          :amount="transaction.amount"
          :has-hover-effect="props.hasHoverEffect"
          @click="handleClick(transaction)"
      />
    </ul>
  </div>
</template>
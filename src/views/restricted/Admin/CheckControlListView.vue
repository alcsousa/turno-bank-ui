<script setup>
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import TransactionsList from "@/components/ui/lists/TransactionList.vue";
import RoundedSpinner from "@/components/ui/spinners/RoundedSpinner.vue";
import {onMounted, ref} from "vue";
import {indexChecksByStatus} from "@/api/checks/admin/indexChecksByStatus.js";
import AlternativeButton from "@/components/ui/buttons/AlternativeButton.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const checks = ref([])
const error = ref(null)
const loading = ref(false)
const currentPage = ref(1)
const hasMorePages = ref(true)

const fetchChecks = async () => {
  if (loading.value || !hasMorePages.value) return;

  loading.value = true
  error.value = null

  try {
    const response = await indexChecksByStatus('pending', currentPage.value)
    const { data, meta } = response

    if (data.length > 0) {
      checks.value = [...checks.value, ...data]
      currentPage.value++
      hasMorePages.value = currentPage.value <= meta.last_page
    } else {
      hasMorePages.value = false
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const handleTransactionClick = (transaction) => {
  router.push({ name: 'checkControlDetail', params: { id: transaction.id } })
}

onMounted(() => {
  fetchChecks()
})
</script>

<template>
  <AuthenticatedLayout title="Check Control">
    <DangerAlert :error="error" />
    <RoundedSpinner :enabled="loading" />

    <TransactionsList
        :transactions="checks"
        :onItemClick="handleTransactionClick"
    />

    <AlternativeButton
        text="Load more"
        :enabled="!loading && hasMorePages"
        @click.prevent="fetchChecks()"
    />
  </AuthenticatedLayout>
</template>
<script setup>
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import TransactionsList from "@/components/ui/lists/TransactionList.vue";
import RoundedSpinner from "@/components/ui/spinners/RoundedSpinner.vue";
import {onMounted, ref} from "vue";
import {indexChecksByStatus} from "@/api/checks/admin/indexChecksByStatus.js";
import AlternativeButton from "@/components/ui/buttons/AlternativeButton.vue";
import {useRouter} from "vue-router";
import InfoAlert from "@/components/alerts/InfoAlert.vue";

const router = useRouter()
const checks = ref([])
const error = ref(null)
const loading = ref(false)
const currentPage = ref(1)
const hasMorePages = ref(true)
const hasHoverEffect = ref(true)

const fetchPaginated = () => {
  if (loading.value || !hasMorePages.value) return;
  fetchChecks()
}

const fetchChecks = async () => {
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

    <div v-if="checks.length > 0">
      <TransactionsList
          :transactions="checks"
          :onItemClick="handleTransactionClick"
          :has-hover-effect="hasHoverEffect"
      />
    </div>
    <div v-else>
      <InfoAlert message="hooray! All pending checks were evaluated." />
      <AlternativeButton
          text="Fetch new checks"
          @click.prevent="fetchChecks()"
      />
    </div>

    <AlternativeButton
        text="Load more"
        :enabled="!loading && hasMorePages"
        @click.prevent="fetchPaginated()"
    />
  </AuthenticatedLayout>
</template>
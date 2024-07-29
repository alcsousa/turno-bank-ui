<script setup>
import ButtonLink from "@/components/ui/buttons/ButtonLink.vue";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import TransactionsList from "@/components/ui/lists/TransactionList.vue";
import {onMounted, ref} from "vue";
import {indexChecks} from "@/api/checks/indexChecks.js";
import RoundedSpinner from "@/components/ui/spinners/RoundedSpinner.vue";
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import HorizontalTab from "@/components/ui/tabs/HorizontalTab.vue";
import InfoAlert from "@/components/alerts/InfoAlert.vue";
import AlternativeButton from "@/components/ui/buttons/AlternativeButton.vue";

const checks = ref([])
const error = ref(null)
const loading = ref(false)
const currentPage = ref(1)
const hasMorePages = ref(true)
const currentStatus = ref('pending')

const fetchPaginated = () => {
  if (loading.value || !hasMorePages.value) return;
  fetchChecks()
}

const fetchChecks = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await indexChecks(currentStatus.value, currentPage.value)
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

const tabOptions = ['Pending', 'Accepted', 'Rejected'];
const currentTabOption = ref('Pending')
const handleTabOptionChange = (option) => {
  if (currentTabOption.value == option) return;

  currentTabOption.value = option
  currentStatus.value = option.toLowerCase()
  checks.value = []
  currentPage.value = 1
  hasMorePages.value = true
  fetchChecks()
}

onMounted(() => {
  fetchChecks()
})
</script>

<template>
  <AuthenticatedLayout title="Checks">
    <ButtonLink to="/check/deposit">
      Make a Deposit
    </ButtonLink>

    <DangerAlert :error="error" />
    <RoundedSpinner :enabled="loading" />

    <HorizontalTab
        :tab-options="tabOptions"
        :current-tab-option="currentTabOption"
        @update:currentTabOptionChange="handleTabOptionChange"
    />

    <div v-if="checks.length > 0">
      <TransactionsList :transactions="checks" />
    </div>
    <div v-else>
      <InfoAlert message="Your check history is empty. Make a deposit to start using you account! ;)" />
      <AlternativeButton
          text="Fetch new transactions"
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
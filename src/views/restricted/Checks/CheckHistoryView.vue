<script setup>
import ButtonLink from "@/components/ui/buttons/ButtonLink.vue";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import TransactionsList from "@/components/ui/lists/TransactionList.vue";
import {computed, onMounted, ref} from "vue";
import {indexChecks} from "@/api/checks/indexChecks.js";
import RoundedSpinner from "@/components/ui/spinners/RoundedSpinner.vue";
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import HorizontalTab from "@/components/ui/tabs/HorizontalTab.vue";

const checks = ref([])
const error = ref(null)
const loading = ref(true)

const fetchChecks = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await indexChecks()
    checks.value = response.data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const tabOptions = ['Pending', 'Accepted', 'Rejected'];
const currentTabOption = ref('Pending')
const handleTabOptionChange = (option) => {
  currentTabOption.value = option
}

const filteredChecks = computed(() => {
  return checks.value.filter(check => check.status.name === currentTabOption.value)
})

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
    <TransactionsList :transactions="filteredChecks" />
  </AuthenticatedLayout>
</template>
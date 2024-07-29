<script setup>
import {useAuthStore} from "@/stores/auth.js";
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import InfoAlert from "@/components/alerts/InfoAlert.vue";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import TransactionsList from "@/components/ui/lists/TransactionList.vue";
import RoundedSpinner from "@/components/ui/spinners/RoundedSpinner.vue";
import {onMounted, ref} from "vue";
import {indexTransactions} from "@/api/transactions/indexTransactions.js";
import BaseHeading3 from "@/components/ui/headings/BaseHeading3.vue";
import {getAccount} from "@/api/account/getAccount.js";
import AlternativeButton from "@/components/ui/buttons/AlternativeButton.vue";
import {formatCurrency} from "@/utils/currency.js";

const auth = useAuthStore()

const transactions = ref([])
const error = ref(null)
const loading = ref(false)
const loadingAccount = ref(false)
const currentPage = ref(1)
const hasMorePages = ref(true)
const currentBalance = ref(0)

const fetchPaginated = () => {
  if (loading.value || !hasMorePages.value) return;
  fetchTransactions()
}

const fetchTransactions = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await indexTransactions(currentPage.value)
    const { data, meta } = response

    if (data.length > 0) {
      transactions.value = [...transactions.value, ...data]
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

const fetchAccount = async () => {
  loadingAccount.value = true
  error.value = null

  try {
    const response = await getAccount()
    currentBalance.value = response.balance
  } catch (err) {
    error.value = err
  } finally {
    loadingAccount.value = false
  }
}

onMounted(() => {
  fetchTransactions()
  fetchAccount()
})
</script>

<template>
  <AuthenticatedLayout title="Dashboard">
    <DangerAlert :error="error" />
    <RoundedSpinner :enabled="loading" />

    <div class="flex space-x-2 my-6">
      <div class="w-full p-5 rounded-md shadow flex-1 items-center">
        <div>Welcome,</div>
        <div class="text-base font-semibold text-2xl">
          {{ auth.user.name }}
        </div>
      </div>

      <div class="bg-blue-500 text-white w-full p-5 rounded-md shadow flex-1">
        <div>Current balance</div>
        <div class="text-base font-semibold text-2xl">
          {{ formatCurrency(currentBalance) }}
        </div>
      </div>
    </div>

    <BaseHeading3 title="Transactions" />

    <div v-if="transactions.length > 0">
      <TransactionsList :transactions="transactions" />
    </div>
    <div v-else>
      <InfoAlert message="Your transaction history is empty. Make a deposit to start using you account! ;)" />
      <AlternativeButton
          text="Fetch new transactions"
          @click.prevent="fetchTransactions()"
      />
    </div>

    <AlternativeButton
        text="Load more"
        :enabled="!loading && hasMorePages"
        @click.prevent="fetchPaginated()"
    />
  </AuthenticatedLayout>
</template>

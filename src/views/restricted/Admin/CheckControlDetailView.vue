<script setup>
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import RoundedSpinner from "@/components/ui/spinners/RoundedSpinner.vue";
import {onMounted, ref} from "vue";
import DetailList from "@/components/ui/lists/DetailList.vue";
import DetailListItem from "@/components/ui/lists/DetailListItem.vue";
import {getCheckDetails} from "@/api/checks/admin/getCheckDetails.js";
import {useRoute, useRouter} from "vue-router";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import AlertButton from "@/components/ui/buttons/AlertButton.vue";
import {useEvaluateCheck} from "@/services/checkService.js";

const router = useRouter()
const route = useRoute()
const error = ref(null)
const loading = ref(true)
const check = ref({
  description: '',
  amount: ''
})
const { evaluateCheck } = useEvaluateCheck()

const fetchData = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await getCheckDetails(route.params.id)
    check.value = response
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const handleCheckEvaluation = async (isAccepted) => {
  loading.value = true
  error.value = null

  try {
    await evaluateCheck(route.params.id, isAccepted)
    await router.push({ name: 'checkControlList' })
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <AuthenticatedLayout title="Check Details">
    <DangerAlert :error="error" />
    <RoundedSpinner :enabled="loading" />

    <div v-if="!loading">
      <DetailList>
        <DetailListItem
            title="Customer"
            :description="check.account.user.name"
        />
        <DetailListItem
            title="Customer email"
            :description="check.account.user.email"
        />
        <DetailListItem
            title="Account"
            :description="check.account.id"
        />
        <DetailListItem
            title="Reported amount"
            :description="check.amount"
        />
      </DetailList>

      <img class="h-auto max-w-lg mx-auto" :src="check.image_url" alt="image description">

      <div class="flex space-x-2 my-6">
        <AlertButton text="Reject" @click.prevent="handleCheckEvaluation(false)" />
        <PrimaryButton text="Accept" @click.prevent="handleCheckEvaluation(true)" />
      </div>
    </div>
  </AuthenticatedLayout>
</template>
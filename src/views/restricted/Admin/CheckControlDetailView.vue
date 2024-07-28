<script setup>
import DangerAlert from "@/components/alerts/DangerAlert.vue";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import RoundedSpinner from "@/components/ui/spinners/RoundedSpinner.vue";
import {onMounted, ref} from "vue";
import DetailList from "@/components/ui/lists/DetailList.vue";
import DetailListItem from "@/components/ui/lists/DetailListItem.vue";
import {getCheckDetails} from "@/api/checks/admin/getCheckDetails.js";
import {useRoute} from "vue-router";

const route = useRoute()
const error = ref(null)
const loading = ref(true)
const check = ref({
  description: '',
  amount: ''
})

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

onMounted(() => {
  fetchData()
})

</script>

<template>
  <AuthenticatedLayout title="Check Details">
    <DangerAlert :error="error" />
    <RoundedSpinner :enabled="loading" />

    <DetailList v-show="!loading">
      <DetailListItem
          title="Customer"
          :description="check.description"
      />
<!--      <DetailListItem-->
<!--          title="Customer email"-->
<!--          description="___"-->
<!--      />-->
<!--      <DetailListItem-->
<!--          title="Account"-->
<!--          description="___"-->
<!--      />-->
      <DetailListItem
          title="Reported amount"
          :description="check.amount"
      />
    </DetailList>

    <p>Add image here...</p>

    <p>Add buttons here</p>

  </AuthenticatedLayout>
</template>
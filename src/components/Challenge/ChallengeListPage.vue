<template>
  <div>
    <h1>All Challenges</h1>
    <DataTable :value="challenges" :loading="loading" class="p-datatable-sm">
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description"></Column>
      <Column
        field="startDate"
        header="Start Date"
        :body="formatDateCell"></Column>
      <Column field="endDate" header="End Date" :body="formatDateCell"></Column>
      <Column field="status" header="Status"></Column>
      <Column header="Actions" :body="actionTemplate"></Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted, h } from 'vue';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { formatDate } from '@/utils/dateUtils';
import { useRouter } from 'vue-router';
import { getChallenges } from '@/api/challenge/challengeService';

export default {
  name: 'ChallengeListPage',
  components: {
    // eslint-disable-next-line
    Button,
    DataTable,
    Column,
  },
  setup() {
    const challenges = ref([]);
    const loading = ref(true);
    const toast = useToast();
    const router = useRouter();
    const jwt = localStorage.getItem('token'); // Retrieve the JWT token

    const fetchChallenges = async () => {
      try {
        const data = await getChallenges(jwt);
        challenges.value = data;
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch challenges',
          life: 3000,
        });
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchChallenges);

    const formatDateCell = (rowData) => formatDate(rowData.startDate);

    const viewChallenge = (id) => {
      router.push(`/challenge/${id}`);
    };

    const actionTemplate = (rowData) => {
      return h(Button, {
        label: 'View',
        onClick: () => viewChallenge(rowData.id),
      });
    };

    return {
      challenges,
      loading,
      formatDateCell,
      actionTemplate,
      viewChallenge,
    };
  },
};
</script>

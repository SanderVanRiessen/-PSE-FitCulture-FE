<template>
  <div>
    <h1>Challenge Details</h1>
    <div v-if="challenge">
      <p><strong>Name:</strong> {{ challenge.name }}</p>
      <p><strong>Description:</strong> {{ challenge.description }}</p>
      <p><strong>Start Date:</strong> {{ formatDate(challenge.startDate) }}</p>
      <p><strong>End Date:</strong> {{ formatDate(challenge.endDate) }}</p>
      <p><strong>Status:</strong> {{ challenge.status }}</p>
      <h3>Participants</h3>
      <ul>
        <li v-for="participant in challenge.participants" :key="participant.id">
          {{ participant.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { formatDate } from '@/utils/dateutil';
import { getChallengeById } from '@/services/challengeService';

export default {
  name: 'ChallengeDetailPage',
  setup() {
    const route = useRoute();
    const challenge = ref(null);
    const toast = useToast();
    const jwt = localStorage.getItem('token'); // Retrieve the JWT token

    const fetchChallenge = async () => {
      try {
        const data = await getChallengeById(jwt, route.params.id);
        challenge.value = data;
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch challenge details', life: 3000 });
      }
    };

    onMounted(fetchChallenge);

    return {
      challenge,
      formatDate
    };
  },
};
</script>

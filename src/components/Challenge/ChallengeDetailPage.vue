<template>
  <div>
    <h1>Create Challenge</h1>
    <form @submit.prevent="submitChallenge">
      <div>
        <label for="name">Name</label>
        <InputText id="name" v-model="form.name" required />
      </div>
      <div>
        <label for="description">Description</label>
        <InputText id="description" v-model="form.description" required />
      </div>
      <div>
        <label for="exercisePlanId">Exercise Plan</label>
        <Dropdown
          :options="exercisePlans"
          optionLabel="name"
          v-model="form.exercisePlanId"
          required />
      </div>
      <div>
        <label for="challengerUsername">Challenger Username</label>
        <InputText
          id="challengerUsername"
          v-model="form.challengerUsername"
          required />
      </div>
      <div>
        <label for="startDate">Start Date</label>
        <Calendar id="startDate" v-model="form.startDate" required />
      </div>
      <div>
        <label for="endDate">End Date</label>
        <Calendar id="endDate" v-model="form.endDate" required />
      </div>
      <Button label="Create" type="submit" />
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import { createChallenge } from '@/api/challenge/challengeService';
import exerciseplansFetch from '@/api/exerciseplan/exerciseplansFetch';

export default {
  name: 'CreateChallengePage',
  components: {
    InputText,
    Dropdown,
    Calendar,
    Button,
  },
  setup() {
    const form = ref({
      name: '',
      description: '',
      exercisePlanId: null,
      challengerUsername: '',
      startDate: null,
      endDate: null,
    });
    const exercisePlans = ref([]);
    const toast = useToast();
    const jwt = localStorage.getItem('token'); // Retrieve the JWT token

    const fetchExercisePlans = async () => {
      try {
        const response = await exerciseplansFetch(jwt);
        exercisePlans.value = response;
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch exercise plans',
          life: 3000,
        });
      }
    };

    const submitChallenge = async () => {
      try {
        await createChallenge(jwt, form.value);
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Challenge created successfully',
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create challenge',
          life: 3000,
        });
      }
    };

    onMounted(fetchExercisePlans);

    return {
      form,
      exercisePlans,
      submitChallenge,
    };
  },
};
</script>

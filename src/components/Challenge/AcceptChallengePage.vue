<template>
  <div>
    <h1>Accept Challenge</h1>
    <form @submit.prevent="acceptChallengeAction">
      <div>
        <label for="challengeId">Challenge ID</label>
        <InputText id="challengeId" v-model="form.challengeId" required />
      </div>
      <div>
        <label for="username">Username</label>
        <InputText id="username" v-model="form.username" required />
      </div>
      <Button label="Accept" type="submit" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { acceptChallenge } from '@/api/challenge/challengeService';

export default {
  name: 'AcceptChallengePage',
  components: {
    InputText,
    Button,
  },
  setup() {
    const form = ref({
      challengeId: '',
      username: '',
    });
    const toast = useToast();
    const jwt = localStorage.getItem('token'); // Retrieve the JWT token

    const acceptChallengeAction = async () => {
      try {
        await acceptChallenge(jwt, form.value);
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Challenge accepted successfully',
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to accept challenge',
          life: 3000,
        });
      }
    };

    return {
      form,
      acceptChallengeAction,
    };
  },
};
</script>

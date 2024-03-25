<template>
  <div>
    <div class="flex flex-row gap-6">
      <EmailInput v-model="email" />
      <PasswordInput v-model="password" />
    </div>

    <NameInput v-model="name" />
    <Button
      label="Register"
      icon="pi pi-user"
      class="w-full mt-5"
      :loading="isLoading"
      @click="registerUser(mutate)" />
  </div>
</template>

<script setup>
import { useMutation } from '@tanstack/vue-query';
import registerFetch from '@/api/authentication/registerFetch';

const { mutate, isLoading } = useMutation({
  mutationFn: (user) => registerFetch(user),
});
</script>

<script>
import { useToast } from 'primevue/usetoast';
import { router } from '@/router';

import EmailInput from './EmailInput.vue';
import PasswordInput from './PasswordInput.vue';
import NameInput from './NameInput.vue';

export default {
  name: 'RegisterForum',
  components: {
    EmailInput,
    PasswordInput,
    NameInput,
  },
  data() {
    return {
      email: { value: '', error: false },
      password: { value: '', error: false },
      name: { value: '', error: false },
      toast: useToast(),
    };
  },
  methods: {
    registerUser(mutate) {
      const hasError = (input) => {
        const isError = input.error || input.value.length === 0;
        return isError;
      };
      if (
        hasError(this.email) ||
        hasError(this.password) ||
        hasError(this.name)
      ) {
        return;
      }
      mutate(
        {
          name: this.name.value,
          email: this.email.value,
          password: this.password.value,
          role: 'user',
        },
        {
          onSuccess: () => {
            this.toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User registered successfully',
              life: 3000,
            });
            router.push('/');
          },
          onError: (error) => {
            this.toast.add({
              severity: 'error',
              summary: 'Error',
              detail: error,
              life: 3000,
            });
          },
        },
      );
    },
  },
};
</script>

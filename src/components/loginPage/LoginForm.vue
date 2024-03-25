<template>
  <div>
    <EmailInput v-model="email" />
    <PasswordInput v-model="password" />

    <div class="flex align-items-center justify-content-between mb-6">
      <RememberMeCheck />
      <a
        class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
        >Forgot password?</a
      >
    </div>

    <Button
      @click="login(mutate)"
      label="Sign In"
      icon="pi pi-user"
      class="w-full"
      :loading="isLoading"></Button>
  </div>
</template>

<script setup>
import { useMutation } from '@tanstack/vue-query';
import loginFetch from '@/api/authentication/loginFetch';
import RememberMeCheck from './RememberMeCheck.vue';
import EmailInput from './EmailInput.vue';
import PasswordInput from './PasswordInput.vue';

const { mutate, isLoading } = useMutation({
  mutationFn: (userLogin) => loginFetch(userLogin),
});
</script>

<script>
import { useToast } from 'primevue/usetoast';
import { mapMutations } from 'vuex';
import { router } from '@/router';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      checked: false,
      toast: useToast(),
    };
  },
  components: {
    EmailInput,
    PasswordInput,
    RememberMeCheck,
  },
  methods: {
    ...mapMutations(['setToken']),
    goToRegister() {
      router.push('/register');
    },
    login(mutate) {
      mutate(
        {
          username: this.email,
          password: this.password,
        },
        {
          onSuccess: (data) => {
            this.setToken(data.jwt);
            localStorage.setItem('token', data.jwt);
            this.toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Logged in successfully',
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

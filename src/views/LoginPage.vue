<template>
  <div class="flex justify-content-center">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
        <span class="text-600 font-medium line-height-3"
          >Don't have an account?</span
        >
        <a
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          @click="goToRegister"
          >Create today!</a
        >
      </div>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/loginPage/LoginForm.vue';
export default {
  name: 'LoginPage',
  components: {
    LoginForm,
  },
};
</script>

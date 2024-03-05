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

      <div>
        <label for="email1" class="block text-900 font-medium mb-2"
          >Email</label
        >
        <InputText
          id="email1"
          type="email"
          v-model="email"
          required
          class="w-full mb-3"
        />

        <label for="password1" class="block text-900 font-medium mb-2"
          >Password</label
        >
        <InputText
          id="password1"
          type="password"
          v-model="password"
          required
          toggleMask
          class="w-full mb-3"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox
              id="rememberme1"
              :binary="true"
              v-model="checked"
              class="mr-2"
            ></Checkbox>
            <label for="rememberme1">Remember me</label>
          </div>
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
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMutation } from "@tanstack/vue-query";
import loginFetch from "@/api/authentication/loginFetch";

const { mutate } = useMutation({
  mutationFn: (userLogin) => loginFetch(userLogin),
});
</script>

<script>
import { useToast } from "primevue/usetoast";
import { mapMutations } from "vuex";
import { router } from "@/router";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      checked: false,
      toast: useToast(),
    };
  },
  methods: {
    ...mapMutations(["setToken"]),
    goToRegister() {
      router.push("/register");
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
            this.toast.add({
              severity: "success",
              summary: "Success",
              detail: "Logged in successfully",
              life: 3000,
            });
            router.push("/");
          },
          onError: (error) => {
            this.toast.add({
              severity: "error",
              summary: "Error",
              detail: error,
              life: 3000,
            });
          },
        }
      );
    },
  },
};
</script>

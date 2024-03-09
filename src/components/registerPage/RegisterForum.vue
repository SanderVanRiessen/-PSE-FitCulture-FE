<template>
  <div>
    <div class="flex flex-row gap-6">
      <EmailInput v-model="email" />
      <PasswordInput :password="password" />
    </div>

    <NameInput :name="name" />
    <Button
      @click="registerUser(mutate)"
      label="Register"
      icon="pi pi-user"
      class="w-full mt-5"
      :loading="isLoading"
    />
  </div>
</template>

<script setup>
import { useMutation } from "@tanstack/vue-query";
import registerFetch from "@/api/authentication/registerFetch";

const { mutate, isLoading } = useMutation({
  mutationFn: (user) => registerFetch(user),
});
</script>

<script>
import { useToast } from "primevue/usetoast";
import { router } from "@/router";

import EmailInput from "./EmailInput.vue";
import PasswordInput from "./PasswordInput.vue";
import NameInput from "./NameInput.vue";

export default {
  name: "RegisterForum",
  components: {
    EmailInput,
    PasswordInput,
    NameInput,
  },
  data() {
    return {
      email: { value: "", error: "" },
      password: { value: "", error: "" },
      name: { value: "", error: "" },
      toast: useToast(),
    };
  },
  methods: {
    registerUser(mutate) {
      if (this.email.error || this.password.error || this.name.error) {
        return;
      }
      mutate(
        {
          name: this.name,
          email: this.email,
          password: this.password,
          role: "user",
        },
        {
          onSuccess: () => {
            this.toast.add({
              severity: "success",
              summary: "Success",
              detail: "User registered successfully",
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

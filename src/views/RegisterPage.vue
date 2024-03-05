<template>
  <div class="flex justify-content-center">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
        <span class="text-600 font-medium line-height-3"
          >Register your account!</span
        >
      </div>

      <div>
        <div class="flex flex-row gap-6">
          <div class="field flex flex-column w-full">
            <label for="email" class="block text-900 font-medium mb-2"
              >Email</label
            >
            <InputText
              id="email"
              type="email"
              v-model="email"
              required
              v-bind:invalid="emailError > 0"
              v-on:blur="validateEmail(email)"
            />
            <small
              id="username-help"
              class="mt-1 text-red-600"
              v-show="emailError"
              >Email is not valid</small
            >
          </div>
          <div class="field flex flex-column w-full">
            <label for="password" class="block text-900 font-medium mb-2"
              >Password</label
            >
            <Password
              id="passowrd"
              v-model="password"
              toggleMask
              required
              type="password"
              v-bind:invalid="passwordError > 0"
              v-on:blur="validatePassword(password)"
              inputClass="w-full"
            >
              <template #header>
                <h6 class="my-1">Pick a password</h6>
              </template>
              <template #footer>
                <Divider />
                <p class="mt-2">Suggestions</p>
                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                  <li>At least one lowercase</li>
                  <li>At least one uppercase</li>
                  <li>At least one numeric</li>
                  <li>Minimum 8 characters</li>
                </ul>
              </template>
            </Password>
            <small
              id="password-help"
              class="mt-1 text-red-600"
              v-show="passwordError"
              >Password is not valid</small
            >
          </div>
        </div>

        <div class="field flex flex-column w-full">
          <label for="name" class="block text-900 font-medium mb-2">Name</label>
          <InputText v-model="name" id="name" type="text" required />
        </div>
        <Button
          @click="registerUser(mutate)"
          label="Register"
          icon="pi pi-user"
          class="w-full mt-5"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMutation } from "@tanstack/vue-query";
import registerFetch from "@/api/authentication/registerFetch";

const { mutate } = useMutation({
  mutationFn: (user) => registerFetch(user),
});
</script>

<script>
import { useToast } from "primevue/usetoast";
import { router } from "@/router";

export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      emailError: "",
      name: "",
      nameError: "",
      password: "",
      passwordError: "",
      toast: useToast(),
    };
  },
  methods: {
    validateEmail(value) {
      this.emailError = !value.includes("@");
    },
    validatePassword(value) {
      this.passwordError = value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      );
    },
    registerUser(mutate) {
      if (this.emailError || this.passwordError) {
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

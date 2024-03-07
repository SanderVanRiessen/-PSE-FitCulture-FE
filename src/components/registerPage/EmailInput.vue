<template>
  <div class="field flex flex-column w-full">
    <label for="email" class="block text-900 font-medium mb-2">Email</label>
    <InputText
      id="email"
      type="email"
      v-model="emailValue"
      required
      v-bind:invalid="emailError > 0"
      v-on:blur="validateEmail(emailValue)"
    />
    <small id="username-help" class="mt-1 text-red-600" v-show="emailError"
      >Email is not valid</small
    >
  </div>
</template>

<script>
export default {
  name: "EmailInput",
  props: ["email"],
  data() {
    return {
      emailValue: this.email.value,
      emailError: this.email.error,
    };
  },
  methods: {
    validateEmail(value) {
      this.emailError = !value.includes("@");
    },
  },
};
</script>

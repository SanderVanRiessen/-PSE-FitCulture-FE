<template>
  <div class="field flex flex-column w-full">
    <label for="email" class="block text-900 font-medium mb-2">Email</label>
    <InputText
      id="email"
      type="email"
      v-model="value"
      required
      v-bind:invalid="error > 0"
      v-on:blur="validateEmail(value)"
      data-testid="email-input"
    />
    <small id="username-help" class="mt-1 text-red-600" v-show="error"
      >Email is not valid</small
    >
  </div>
</template>

<script>
export default {
  name: "EmailInput",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.value;
      },
      set(value) {
        this.$emit("update:modelValue", { value, error: this.error });
      },
    },
  },
  data() {
    return {
      email: this.modelValue.value,
      error: this.modelValue.error,
    };
  },
  methods: {
    validateEmail(value) {
      this.error = !value.includes("@");
    },
  },
};
</script>

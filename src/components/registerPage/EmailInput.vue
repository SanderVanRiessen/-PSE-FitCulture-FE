<template>
  <div class="field flex flex-column w-full">
    <label for="email" class="block text-900 font-medium mb-2">Email</label>
    <InputText
      id="email"
      v-model="value"
      type="email"
      required
      :invalid="error > 0"
      data-testid="email-input"
      @blur="validateEmail(value)" />
    <small v-show="error" id="username-help" class="mt-1 text-red-600"
      >Email is not valid</small
    >
  </div>
</template>

<script>
export default {
  name: 'EmailInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      email: this.modelValue.value,
      error: this.modelValue.error,
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue.value;
      },
      set(value) {
        this.$emit('update:modelValue', { value, error: this.error });
      },
    },
  },
  methods: {
    validateEmail(value) {
      this.error = !value.includes('@');
    },
  },
};
</script>

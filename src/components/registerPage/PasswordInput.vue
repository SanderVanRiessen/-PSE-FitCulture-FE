<template>
  <div class="field flex flex-column w-full">
    <label for="password" class="block text-900 font-medium mb-2"
      >Password</label
    >
    <Password
      id="passowrd"
      v-model="value"
      toggle-mask
      required
      type="password"
      :invalid="error > 0"
      input-class="w-full"
      data-testid="password-input"
      strong-regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[a-zA-Z\d!@#$%^&*()\-_+=]{8,}"
      @blur="validatePassword(value)">
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
          <li>At least one special</li>
          <li>Minimum 8 characters</li>
        </ul>
      </template>
    </Password>
    <small v-show="error" id="password-help" class="mt-1 text-red-600"
      >Password is not valid</small
    >
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      password: this.modelValue.value,
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
    validatePassword(value) {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[a-zA-Z\d!@#$%^&*()\-_+=]{8,}$/;
      this.error = !value.match(regex);
    },
  },
};
</script>

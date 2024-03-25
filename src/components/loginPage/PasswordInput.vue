<template>
  <div>
    <label for="password1" class="block text-900 font-medium mb-2"
      >Password</label
    >
    <InputText
      id="password1"
      v-model="value"
      type="password"
      required
      toggle-mask
      class="w-full mb-3"
      data-testid="password-input" />
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

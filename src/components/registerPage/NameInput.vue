<template>
  <div class="field flex flex-column w-full">
    <label for="name" class="block text-900 font-medium mb-2">Name</label>
    <InputText
      id="name"
      v-model="value"
      type="text"
      required
      :invalid="error > 0"
      data-testid="name-input" />
  </div>
</template>

<script>
export default {
  name: 'NameInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      name: this.modelValue.value,
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
};
</script>

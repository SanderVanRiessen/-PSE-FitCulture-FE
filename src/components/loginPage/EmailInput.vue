<template>
  <div>
    <label for="email1" class="block text-900 font-medium mb-2">Email</label>
    <InputText
      id="email1"
      type="email"
      v-model="value"
      required
      class="w-full mb-3"
      data-testid="email-input"
    />
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
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

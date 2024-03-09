<template>
  <div>
    <label for="password1" class="block text-900 font-medium mb-2"
      >Password</label
    >
    <InputText
      id="password1"
      type="password"
      v-model="value"
      required
      toggleMask
      class="w-full mb-3"
    />
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
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

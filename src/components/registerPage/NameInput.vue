<template>
  <div class="field flex flex-column w-full">
    <label for="name" class="block text-900 font-medium mb-2">Name</label>
    <InputText v-model="value" id="name" type="text" required />
  </div>
</template>

<script>
export default {
  name: "NameInput",
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
      name: this.modelValue.value,
      error: this.modelValue.error,
    };
  },
  methods: {
    validateName(value) {
      this.error = value.length < 3 ?? "Name is too short";
    },
  },
};
</script>

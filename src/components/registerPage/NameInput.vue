<template>
  <div class="field flex flex-column w-full">
    <label for="name" class="block text-900 font-medium mb-2">Name</label>
    <InputText v-model="nameValue" id="name" type="text" required />
  </div>
</template>

<script>
export default {
  name: "NameInput",
  props: ["name"],
  data() {
    return {
      nameValue: this.name.value,
      nameError: this.name.error,
    };
  },
  methods: {
    validateName(value) {
      this.nameError = value.length < 3 ?? "Name is too short";
    },
  },
};
</script>

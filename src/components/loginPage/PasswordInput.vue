<template>
  <div>
    <label for="password1" class="block text-900 font-medium mb-2"
      >Password</label
    >
    <InputText
      id="password1"
      type="password"
      v-model="passwordValue"
      required
      toggleMask
      class="w-full mb-3"
    />
  </div>
</template>

<script>
export default {
  props: ["password"],
  data() {
    return {
      passwordValue: this.password,
    };
  },
};
</script>

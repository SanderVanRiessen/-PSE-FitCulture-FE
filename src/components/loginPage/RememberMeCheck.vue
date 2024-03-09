<template>
  <div class="flex align-items-center">
    <Checkbox
      id="rememberme1"
      :binary="true"
      v-model="checkedValue"
      class="mr-2"
    ></Checkbox>
    <label for="rememberme1">Remember me</label>
  </div>
</template>

<script>
export default {
  props: ["checked"],
  data() {
    return {
      checkedValue: this.checked,
    };
  },
};
</script>

<template>
  <div class="flex align-items-center">
    <Checkbox
      id="rememberme1"
      v-model="checkedValue"
      :binary="true"
      class="mr-2"
      data-testid="remember-me-check" />
    <label for="rememberme1">Remember me</label>
  </div>
</template>

<script>
export default {
  props: ['checked'],
  data() {
    return {
      checkedValue: this.checked,
    };
  },
};
</script>

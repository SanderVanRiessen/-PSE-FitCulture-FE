<template>
  <div class="flex justify-content-center">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
        <span class="text-600 font-medium line-height-3"
          >Register your account!</span
        >
      </div>
      <RegisterForum />
    </div>
  </div>
</template>

<script>
import RegisterForum from "@/components/registerPage/RegisterForum.vue";

export default {
  name: "RegisterPage",
  components: {
    RegisterForum,
  },
};
</script>

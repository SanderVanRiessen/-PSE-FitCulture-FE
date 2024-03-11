<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import NavBar from "@/layout/Navbar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

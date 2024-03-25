<template>
  <div>
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/layout/Navbar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

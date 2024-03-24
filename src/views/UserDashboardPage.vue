<template>
  <div class="flex justify-content-center">
    <UserTable />
  </div>
</template>

<script>
import UserTable from "@/components/UserDashboardPage/UserTable.vue";
export default {
  name: "UserDashboardPage",
  components: {
    UserTable,
  },
};
</script>

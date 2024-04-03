<template>
  <div class="flex justify-content-center">
    <ExercisePlansTable />
  </div>
</template>

<script>
import ExercisePlansTable from '@/components/ExercisePlanDashboardPage/ExercisePlanTable.vue';

export default {
  name: 'ExercisePlanDashboardPage',
  components: {
    ExercisePlansTable,
  },
};
</script>

<template>
  <div class="flex flex-column flex-wrap align-content-center">
    <ExercisePlanHeader />
    <ExercisePlansTable />
  </div>
</template>

<script>
import ExercisePlansTable from '@/components/ExercisePlanDashboardPage/ExercisePlanTable.vue';
import ExercisePlanHeader from '@/components/ExercisePlanDashboardPage/Header.vue';

export default {
  name: 'ExercisePlanDashboardPage',
  components: {
    ExercisePlansTable,
    ExercisePlanHeader,
  },
};
</script>

<template>
  <div class="flex flex-column align-content-center flex-wrap">
    <h1>Check all available exercise plans</h1>
    <ExercisePlanTable />
  </div>
</template>

<script>
import ExercisePlanTable from '@/components/JoinExercisePlanPage/ExercisePlanTable.vue';
export default {
  name: 'JoinExercisePlanPage',
  components: {
    ExercisePlanTable,
  },
};
</script>

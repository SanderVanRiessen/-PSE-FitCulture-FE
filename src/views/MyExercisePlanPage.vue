<template>
  <div class="flex flex-column align-content-center flex-wrap">
    <h1>My Exercise Plan Detail Page</h1>
    <MyExercisePlanTable />
  </div>
</template>

<script>
import MyExercisePlanTable from '@/components/MyExercisePlanPage/ExercisePlanTable.vue';
export default {
  name: 'MyExercisePlanDetailPage',
  components: {
    MyExercisePlanTable,
  },
};
</script>

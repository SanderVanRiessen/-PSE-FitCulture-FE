<template>
  <div class="mb-2 flex flex-row justify-content-between flex-wrap">
    <h1 class="text-3xl font-bold">Exercise Plans</h1>
    <Button
      label="Create new plan"
      class="h-3rem"
      @click="visible = true"></Button>
    <CreateModal :visible="visible" @close="visible = false" />
  </div>
</template>

<script>
import CreateModal from './CreateExercisePlan.vue';
export default {
  name: 'ExercisePlanHeader',
  components: {
    CreateModal,
  },
  data() {
    return {
      visible: false,
    };
  },
};
</script>

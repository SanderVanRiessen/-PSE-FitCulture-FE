<template>
  <div class="flex justify-content-center w-9">
    <div class="surface-card p-4 shadow-2 border-round w-full flex flex-row">
      <div class="flex flex-column flex-1">
        <div class="text-3xl font-medium text-900 mb-3">
          {{ exerciseplan.name }}
        </div>
        <div class="font-medium text-500 mb-3">
          {{ exerciseplan.description }}
        </div>
      </div>
      <div class="flex flex-column gap-2">
        <Chip class="py-0 pl-2 pr-3 h-3rem">
          <span
            class="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center"
            >{{ exerciseplan.exercises.length }}</span
          >
          <span class="ml-2 font-medium">exercises</span>
        </Chip>
        <Button
          icon="pi pi-plus"
          label="Add exercise"
          class="flex-auto md:flex-initial white-space-nowrap"
          @click="visible = true"></Button>
      </div>
    </div>
    <CreateModal
      :visible="visible"
      :refetch="refetch"
      @close="visible = false" />
  </div>
</template>

<script>
import CreateModal from '@/components/ExercisePlanDetailPage/AddExerciseModal.vue';

export default {
  name: 'ExercisePlanHeader',
  components: {
    CreateModal,
  },
  props: {
    exerciseplan: {
      type: Object,
      required: true,
    },
    refetch: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
};
</script>

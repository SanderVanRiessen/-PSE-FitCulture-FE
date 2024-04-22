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
          label="Join exercise plan"
          class="flex-auto md:flex-initial white-space-nowrap"
          @click="joinExerciePlan(exerciseplan.id)"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import { useMutation } from '@tanstack/vue-query';
import joinExercisePlan from '@/api/exerciseplan/joinExercisePlan';
import { router } from '@/router';
export default {
  name: 'HeaderExercisePlanDetailPage',
  props: {
    exerciseplan: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const token = localStorage.getItem('token');

    const { mutate } = useMutation({
      mutationFn: (props) => joinExercisePlan(token, props.id),
    });
    return { mutate };
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    joinExerciePlan(id) {
      this.mutate(
        { id },
        {
          onSuccess: () => {
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'You have joined the exercise plan',
              life: 3000,
            });
            router.push('/myexerciseplan');
          },
          onError: (error) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message,
              life: 3000,
            });
          },
        },
      );
    },
  },
};
</script>

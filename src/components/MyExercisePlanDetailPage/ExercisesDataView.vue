<template>
  <div class="flex flex-column flex-wrap align-content-center w-full">
    <div class="card w-8 mt-5 shadow-1">
      <DataView :value="exercises.exercises">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div
              v-for="(item, index) in slotProps.items"
              :key="item.id"
              class="col-12">
              <div
                class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                :class="{ 'border-top-1 surface-border': index !== 0 }">
                <div
                  class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                  <div
                    class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                    <div>
                      <div class="text-lg font-medium text-900 mt-2">
                        {{ item.name }}
                      </div>
                      <span class="font-medium text-secondary text-sm">{{
                        item.description
                      }}</span>
                    </div>
                  </div>
                  <div class="flex flex-column md:align-items-end gap-2">
                    <Dropdown
                      :key="item.id"
                      v-model="selectedStatus"
                      :model-value="
                        statuses.find(
                          (status) => status.name.toUpperCase() === item.status,
                        )
                      "
                      :options="statuses"
                      option-label="name"
                      placeholder="Select status"
                      class="w-full md:w-14rem"
                      @change="updateExerciseStatus(item.id)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<script>
import { useMutation } from '@tanstack/vue-query';
import updateExerciseStatus from '@/api/exerciseplan/updateExerciseStatus';
export default {
  name: 'ExerciseDataView',
  props: {
    exercises: {
      type: Object,
      required: true,
    },
    refetch: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const token = localStorage.getItem('token');

    const { mutate } = useMutation({
      mutationFn: (props) => updateExerciseStatus(token, props),
    });
    return { mutate };
  },
  data() {
    return {
      visible: false,
      selectedExercise: null,
      selectedStatus: null,
      statuses: [
        { name: 'Todo', id: 1 },
        { name: 'Inprogress', id: 2 },
        { name: 'Done', id: 3 },
      ],
    };
  },
  methods: {
    updateExerciseStatus(id) {
      function transformStatus(status) {
        switch (status) {
          case 'Todo':
            return 'TODO';
          case 'Inprogress':
            return 'INPROGRESS';
          case 'Done':
            return 'DONE';
          default:
            return 'TODO';
        }
      }
      this.mutate(
        { id, status: transformStatus(this.selectedStatus.name) },
        {
          onSuccess: () => {
            this.refetch();
          },
          onError: (e) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: e.message,
              life: 3000,
            });
          },
        },
      );
    },
  },
};
</script>

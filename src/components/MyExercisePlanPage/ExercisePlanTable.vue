<template>
  <DataTable :value="data" class="w-9" table-style="min-width: 50rem">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="description" header="Description"></Column>

    <Column field="status" header="Status">
      <template #body="slotProps">
        <Tag
          v-show="isTodoStatus(slotProps.data.status)"
          severity="secondary"
          >{{ slotProps.data.status }}</Tag
        >
        <Tag
          v-show="isInProgressStatus(slotProps.data.status)"
          severity="success"
          >{{ slotProps.data.status }}</Tag
        >
        <Tag v-show="isDoneStatus(slotProps.data.status)" severity="warning">{{
          slotProps.data.status
        }}</Tag>
      </template>
    </Column>
    <Column field="detail" header="Detail page">
      <template #body="slotProps">
        <Button
          label="View"
          class="p-button-text p-button-rounded border-none font-light line-height-2 text-blue-500"
          @click="goToMyExercisePlanDetail(slotProps.data.id)"></Button>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { useQuery } from '@tanstack/vue-query';
import myExercisePlans from '@/api/exerciseplan/myExercisePlans';

export default {
  name: 'ExercisePlanTable',
  setup() {
    const token = localStorage.getItem('token');

    const { data, isLoading } = useQuery({
      queryKey: ['myexerciseplans'],
      queryFn: () => myExercisePlans(token),
    });
    const columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'name' },
      { field: 'description', header: 'Description' },
    ];
    return { data, columns, isLoading };
  },
  methods: {
    goToMyExercisePlanDetail(id) {
      this.$router.push(`/myexerciseplan/${id}`);
    },
    isTodoStatus(status) {
      return status === 'TODO';
    },
    isInProgressStatus(status) {
      return status === 'INPROGRESS';
    },
    isDoneStatus(status) {
      return status === 'DONE';
    },
  },
};
</script>

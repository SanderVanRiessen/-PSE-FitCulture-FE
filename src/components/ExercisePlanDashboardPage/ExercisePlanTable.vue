<template>
  <DataTable :value="data" class="w-9" table-style="min-width: 50rem">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="description" header="Description"></Column>
    <Column field="amount" header="Amount of exercises">
      <template #body="slotProps">
        {{ slotProps.data.exercises.length }}
      </template>
    </Column>
    <Column field="detail" header="Detail page">
      <template #body="slotProps">
        <Button
          label="View"
          class="p-button-text p-button-rounded border-none font-light line-height-2 text-blue-500"
          @click="goToExercisePlanDetail(slotProps.data.id)"></Button>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { useQuery } from '@tanstack/vue-query';
import exerciseplansFetch from '@/api/exerciseplan/exerciseplansFetch';

export default {
  name: 'ExercisePlanTable',
  setup() {
    const token = localStorage.getItem('token');

    const { data, isLoading } = useQuery({
      queryKey: ['exerciseplans'],
      queryFn: () => exerciseplansFetch(token),
    });
    const columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'name' },
      { field: 'description', header: 'Description' },
    ];
    return { data, columns, isLoading };
  },
  methods: {
    goToExercisePlanDetail(id) {
      this.$router.push(`/dashboard/exerciseplan/${id}`);
    },
  },
};
</script>

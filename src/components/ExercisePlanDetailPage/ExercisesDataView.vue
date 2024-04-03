<template>
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
                  <Button icon="pi pi-trash" label="remove" severity="danger" />
                  <Button
                    icon="pi pi-pencil"
                    label="Edit"
                    class="flex-auto md:flex-initial white-space-nowrap"></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
export default {
  name: 'ExercisesDataView',
  props: {
    exercises: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    header="Add Exercise plan"
    :closable="false"
    :style="{ width: '25rem' }">
    <div class="flex align-items-center gap-3 mb-3 mt-2">
      <label for="name" class="font-semibold w-6rem">Name</label>
      <InputText
        id="name"
        v-model="exerciseplan.name"
        class="flex-auto"
        autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="description" class="font-semibold w-6rem">Description</label>
      <InputText
        id="description"
        v-model="exerciseplan.description"
        class="flex-auto"
        autocomplete="off" />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="close()"></Button>
      <Button type="button" label="Save" @click="addExercisePlan()"></Button>
    </div>
  </Dialog>
</template>

<script>
import { useMutation } from '@tanstack/vue-query';
import addExercisePlan from '@/api/exerciseplan/addExercisePlan';
import { useToast } from 'primevue/usetoast';
import { router } from '@/router';

export default {
  name: 'CreateExercisePlan',
  props: {
    visible: {
      type: Boolean,
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
      mutationFn: (props) => addExercisePlan(token, props.exerciseplan),
    });
    return { mutate };
  },
  data() {
    return {
      exerciseplan: {
        name: '',
        description: '',
      },
      toast: useToast(),
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    addExercisePlan() {
      this.mutate(
        { exerciseplan: this.exerciseplan },
        {
          onSuccess: (data) => {
            router.push(`/dashboard/exerciseplan/${data.id}`);
          },
          onError: (error) => {
            this.toast.add({
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

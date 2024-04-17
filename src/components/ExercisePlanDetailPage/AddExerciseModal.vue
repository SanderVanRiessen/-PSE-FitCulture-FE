<template>
  <Dialog
    :visible="visible"
    modal
    header="Add/update Exercise"
    :closable="false"
    :style="{ width: '25rem' }">
    <div class="flex align-items-center gap-3 mb-3 mt-2">
      <label for="name" class="font-semibold w-6rem">Name</label>
      <InputText
        id="name"
        v-model="exercise.name"
        class="flex-auto"
        autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="description" class="font-semibold w-6rem">Description</label>
      <InputText
        id="description"
        v-model="exercise.description"
        class="flex-auto"
        autocomplete="off" />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="close()"></Button>
      <Button type="button" label="Save" @click="addExercise()"></Button>
    </div>
  </Dialog>
</template>

<script>
import { useMutation } from '@tanstack/vue-query';
import addExercise from '@/api/exerciseplan/addExercise';
import updateExercise from '@/api/exerciseplan/updateExercise';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

export default {
  name: 'AddExerciseModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    refetch: {
      type: Function,
      required: true,
    },
    updateexercise: {
      type: Object,
      default: null,
    },
  },
  setup() {
    const token = localStorage.getItem('token');
    const route = useRoute();
    const id = route.params.id;

    const { mutate: addMutate } = useMutation({
      mutationFn: (props) => addExercise(token, props.exercise),
    });
    const { mutate: updateMutate } = useMutation({
      mutationFn: (props) => updateExercise(token, props.exercise),
    });
    return { addMutate, updateMutate, id };
  },
  data() {
    return {
      exercise: {
        name: '',
        description: '',
        exercisePlanId: this.id,
        toast: useToast(),
      },
    };
  },
  watch: {
    updateexercise(newValue) {
      if (newValue) {
        this.exercise = { ...newValue };
      }
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    addExercise() {
      if (this.updateexercise) {
        this.updateMutate(
          { exercise: this.exercise },
          {
            onSuccess: () => {
              this.close();
              this.refetch();
              this.toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Successfully updated exercise',
                life: 3000,
              });
            },
          },
        );
        return;
      }
      this.addMutate(
        { exercise: this.exercise },
        {
          onSuccess: () => {
            this.close();
            this.refetch();
            this.toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully added exercise',
              life: 3000,
            });
          },
        },
      );
    },
  },
};
</script>

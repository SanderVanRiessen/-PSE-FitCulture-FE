<template>
  <Dialog
    :visible="visible"
    modal
    header="Add Exercise"
    :closable="false"
    :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Update your information.</span>
    <div class="flex align-items-center gap-3 mb-3">
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
import { useRoute } from 'vue-router';

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
  },
  setup() {
    const token = localStorage.getItem('token');
    const route = useRoute();
    const id = route.params.id;

    const { mutate } = useMutation({
      mutationFn: (props) => addExercise(token, props.exercise),
    });
    return { mutate, id };
  },
  data() {
    return {
      exercise: {
        name: '',
        description: '',
        exercisePlanId: this.id,
      },
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    addExercise() {
      this.mutate(
        { exercise: this.exercise },
        {
          onSuccess: () => {
            this.close();
            this.refetch();
          },
        },
      );
    },
  },
};
</script>

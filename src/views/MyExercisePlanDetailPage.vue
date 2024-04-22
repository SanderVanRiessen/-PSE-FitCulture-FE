<template>
  <div>
    <div class="flex justify-content-center">
      <ProgressSpinner v-if="isLoading" />
      <MainContent v-if="!isLoading" :exerciseplan="data" />
    </div>
    <div class="flex justify-content-center">
      <ExercisesDataView
        v-if="!isLoading"
        :exercises="data"
        :refetch="refetch" />
    </div>
  </div>
</template>

<script>
import { useQuery } from '@tanstack/vue-query';
import myExercisePlanDetail from '@/api/exerciseplan/myExercisePlanDetail';
import MainContent from '@/components/MyExercisePlanDetailPage/MainContent.vue';
import ExercisesDataView from '@/components/MyExercisePlanDetailPage/ExercisesDataView.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'MyExercisePlanDetailPage',
  components: {
    MainContent,
    ExercisesDataView,
  },
  setup() {
    const token = localStorage.getItem('token');
    const route = useRoute();
    const id = route.params.id;

    const { data, isLoading, refetch } = useQuery({
      queryKey: ['myexerciseplandetail'],
      queryFn: () => myExercisePlanDetail(token, id),
    });
    return { data, isLoading, refetch };
  },
};
</script>

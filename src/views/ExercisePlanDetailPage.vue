<template>
  <div>
    <div class="flex justify-content-center">
      <ProgressSpinner v-if="isLoading" />
      <MainContent v-if="!isLoading" :exerciseplan="data" :refetch="refetch" />
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
import exerciseplanFetch from '@/api/exerciseplan/exerciseplanFetch';
import MainContent from '@/components/ExercisePlanDetailPage/MainContent.vue';
import ExercisesDataView from '@/components/ExercisePlanDetailPage/ExercisesDataView.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ExercisePlanDetailPage',
  components: {
    MainContent,
    ExercisesDataView,
  },
  setup() {
    const token = localStorage.getItem('token');
    const route = useRoute();
    const id = route.params.id;

    const { data, isLoading, refetch } = useQuery({
      queryKey: ['exerciseplan'],
      queryFn: () => exerciseplanFetch(token, id),
    });
    return { data, isLoading, refetch };
  },
};
</script>

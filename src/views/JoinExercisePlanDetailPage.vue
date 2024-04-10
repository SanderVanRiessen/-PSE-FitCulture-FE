<template>
  <div class="flex flex-column align-content-center flex-wrap">
    <h1>Join Exercise Plan Detail Page</h1>
    <Header v-if="!isLoading" :exerciseplan="data" />
    <ProgressSpinner v-if="isLoading" />
  </div>
</template>

<script>
import { useQuery } from '@tanstack/vue-query';
import exerciseplanFetch from '@/api/exerciseplan/exerciseplanFetch';
import { useRoute } from 'vue-router';
import Header from '@/components/JoinExercisePlanDetailPage/Header.vue';
export default {
  name: 'JoinExercisePlanDetailPage',
  components: {
    Header,
  },
  setup() {
    const token = localStorage.getItem('token');
    const route = useRoute();
    const id = route.params.id;

    const { data, isLoading } = useQuery({
      queryKey: ['exerciseplan'],
      queryFn: () => exerciseplanFetch(token, id),
    });
    return { data, isLoading };
  },
};
</script>

<template>
  <Card
    class="flex-grow-1 cursor-pointer hover:text-primary"
    style="margin: 0.5rem; min-width: 500px; max-width: 500px"
    @click="goToCategoryPage">
    <template #title>
      {{ category.name }}
    </template>
    <template #subtitle>
      {{ category.description }}
    </template>
    <template #content>
      <div v-if="category.recentTopics && category.recentTopics.length > 0">
        <ul class="list-none pl-0">
          <li v-for="topic in category.recentTopics" :key="topic.id">
            <TopicItem :topic="topic" />
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No recent topics available.</p>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
import TopicItem from './TopicItem.vue';

export default {
  components: {
    Card,
    TopicItem,
  },
  props: {
    category: Object,
  },
  methods: {
    goToCategoryPage() {
      this.$router.push({
        name: 'category',
        params: { categoryId: this.category.id },
        query: { categoryName: this.category.name }, // Passing the category name as part of the route parameters
      });
    },
  },
};
</script>

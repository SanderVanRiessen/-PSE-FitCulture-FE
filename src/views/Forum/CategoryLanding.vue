<template>
  <div>
    <h1>Topics in "{{ categoryName }}"</h1>
    <TopicList :topics="topics" />
  </div>
</template>

<script>
import axios from 'axios';
import TopicList from '@/components/CategoryLanding/TopicList.vue';

export default {
  components: {
    TopicList,
  },
  props: {
    categoryId: String,
    categoryName: String,
  },
  data() {
    return {
      topics: [],
    };
  },
  mounted() {
    this.fetchTopics();
  },
  methods: {
    fetchTopics() {
      axios
        .get(`/public/forum/${this.categoryId}/topics`)
        .then((response) => {
          this.topics = response.data;
        })
        .catch((error) => {
          console.error('Error fetching topics:', error);
        });
    },
  },
};
</script>

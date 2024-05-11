<template>
  <div>
    <h1>Topics in "{{ categoryName }}"</h1>
    <TopicList :topics="topics" />
    <CreateTopicComponent
      v-if="isLoggedIn"
      :category-id="categoryId"
      @topic-created="fetchTopics" />
    <div v-else>Please sign in to create topics.</div>
  </div>
</template>

<script>
import axios from 'axios';
import TopicList from '@/components/CategoryLanding/TopicList.vue';
import CreateTopicComponent from '@/components/CategoryLanding/CreateTopicComponent.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    TopicList,
    CreateTopicComponent,
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
  computed: {
    ...mapGetters(['isLoggedIn']),
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

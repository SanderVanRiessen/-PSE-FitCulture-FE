<template>
  <div v-if="topic">
    <h2>{{ topic.name }}</h2>
    <div>
      <p>
        Created by: {{ topic.username }} on
        {{ formatDateTime(topic.createdAt) }}
      </p>
      <p>{{ topic.description }}</p>
    </div>
  </div>
  <div v-else>
    <p>Loading topic details...</p>
  </div>
</template>

<script>
import axios from 'axios';
import { formatDateTime } from '@/utils/dateUtils';

export default {
  props: {
    topicId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      topic: null,
    };
  },
  mounted() {
    this.fetchTopic();
  },
  methods: {
    fetchTopic() {
      axios
        .get(`/public/forum/${this.topicId}`)
        .then((response) => {
          this.topic = response.data;
        })
        .catch((error) => {
          console.error('Error fetching topic:', error);
        });
    },
    formatDateTime,
  },
};
</script>

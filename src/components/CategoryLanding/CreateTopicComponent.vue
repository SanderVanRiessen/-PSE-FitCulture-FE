<template>
  <div class="create-topic-container">
    <h3>Create a New Topic</h3>
    <form @submit.prevent="submitTopic">
      <InputText
        v-model="topicTitle"
        placeholder="Topic Title"
        class="mb-2"
        style="width: 100%" />
      <InputText
        v-model="topicText"
        rows="4"
        placeholder="Describe your topic..."
        auto-resize
        style="width: 100%" />
      <Button
        label="Create Topic"
        type="submit"
        :disabled="topicTitle.trim() === '' || topicText.trim() === ''"
        class="p-button-rounded border-none ml-5 font-light text-white line-height-2" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  components: {
    InputText,
    Button,
  },
  props: {
    categoryId: String,
  },
  emits: ['topic-created'],
  setup(props, { emit }) {
    const topicTitle = ref('');
    const topicText = ref('');

    const submitTopic = () => {
      if (topicTitle.value.trim() && topicText.value.trim()) {
        const jwt = localStorage.getItem('token');
        axios
          .post(
            '/forum/topic',
            {
              title: topicTitle.value,
              text: topicText.value,
              categoryId: props.categoryId,
            },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            },
          )
          .then((response) => {
            emit('topic-created', response.data);
            topicTitle.value = '';
            topicText.value = '';
          })
          .catch((error) => {
            console.error('Error creating topic:', error.response.data.message);
          });
      }
    };

    return { topicTitle, topicText, submitTopic };
  },
};
</script>

<style scoped>
.create-topic-container form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

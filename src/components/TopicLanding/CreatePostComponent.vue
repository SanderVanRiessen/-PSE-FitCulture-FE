<template>
  <div class="create-post-container">
    <h3>Add a New Post</h3>
    <form @submit.prevent="submitPost">
      <InputText
        v-model="postContent"
        class="p-inputtextarea p-component p-filled"
        placeholder="Write something..."
        style="width: 100%; min-height: 100px" />
      <Button
        label="Post"
        type="submit"
        :disabled="postContent.trim() === ''"
        class="p-button-rounded border-none ml-5 font-light text-white line-height-2" />
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  components: {
    InputText,
    Button,
  },
  props: {
    topicId: String,
  },
  data() {
    return {
      postContent: '',
    };
  },
  methods: {
    submitPost() {
      const jwt = localStorage.getItem('token');
      axios
        .post(
          `/forum/${this.topicId}/post`,
          { body: this.postContent },
          { headers: { Authorization: `Bearer ${jwt}` } },
        )
        .then(() => {
          this.$emit('post-added'); // Just emit the event, no data needed
          this.postContent = ''; // Clear the textarea after post
        })
        .catch((error) => {
          console.error(
            'Error posting new comment:',
            error.response.data.message,
          );
        });
    },
  },
};
</script>

<style scoped>
.create-post-container form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

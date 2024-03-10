<template>
  <div class="article-container">
    <h1>{{ article.title }}</h1>
    <div class="article-content">
      <Markdown :source="article.body"/>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import Markdown from 'vue3-markdown-it';

export default {
  components: {
    Markdown
  },
  name: 'ArticleDetail',
  setup() {
    const article = ref({});
    const route = useRoute();

    const fetchArticle = async () => {
      const id = route.params.id;
      try {
        const response = await axios.get(`/public/article/${id}`);
        article.value = response.data;
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    onMounted(fetchArticle);

    return { article };
  }
};
</script>

<style scoped>
.article-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 800px; /* Optional: Set maximum width for the article container */
}

.article-content {
  margin-top: 20px; /* Optional: Add some margin between title and content */
}
</style>

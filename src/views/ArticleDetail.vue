<!-- ArticleDetail.vue -->
<template>
  <div>
    <h1>{{ article.title }}</h1>
    <div>
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
        const response = await axios.get(`/article/${id}`);
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



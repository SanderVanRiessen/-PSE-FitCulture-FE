<template>
  <div>
    <h1>Articles</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">An error occurred: {{ error.message }}</div>
    <div v-else class="articles-container">
      <div v-for="article in paginatedArticles" :key="article.id" class="article-wrapper">
        <router-link :to="`/article/${article.id}`" @click="storePageNumber" class="article-link">
          <div class="article-block">
            <h2>{{ article.title }}</h2>
            <div class="article-info">
              <p class="author">{{ article.author }}</p>
              <p class="date">{{ formatDate(article.date) }}</p>
            </div>
          </div>
        </router-link>
      </div>
      <!-- Updated visibility condition -->
      <Paginator v-if="articlesCount > 0"
                 :totalRecords="articlesCount"
                 :rows="rowsPerPage"
                 @page="onPageChange" />
    </div>
  </div>
</template>


<script>
import { ref, computed, onMounted } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import Paginator from 'primevue/paginator';
import { formatDate } from '@/utils/dateUtils';

export default {
  name: 'ArticlesPage',
  methods: { formatDate },
  components: { Paginator },
  setup() {
    const currentPage = ref(1);
    const rowsPerPage = 10;

    const fetchArticles = async () => {
      const response = await axios.get('/public/articlesHeadlines');
      return response.data;
    };

    const { data: articles, isLoading, isError, error } = useQuery({
      queryKey: ['articles'],
      queryFn: fetchArticles,
    });

    const paginatedArticles = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage;
      const end = currentPage.value * rowsPerPage;
      return articles.value?.slice(start, end) || [];
    });

    const articlesCount = computed(() => articles.value.length);
    const onPageChange = (event) => {
      currentPage.value = event.page + 1; // Paginator is zero-based
    };

    const storePageNumber = () => {
      window.sessionStorage.setItem('currentPage', currentPage.value);
      window.history.replaceState({ currentPage: currentPage.value }, null);
    };

    onMounted(() => {
      const storedPage = window.sessionStorage.getItem('currentPage');
      currentPage.value = storedPage ? parseInt(storedPage, 10) : 1;
    });

    return {
      paginatedArticles,
      currentPage,
      rowsPerPage,
      onPageChange,
      isLoading,
      isError,
      error,
      storePageNumber,
      articlesCount,
    };
  },
};
</script>

<style scoped>
.articles-container {
  display: flex;
  flex-wrap: wrap; /* Allow articles to wrap to the next row */
  justify-content: center; /* Center articles horizontally */
  padding: 0 10%; /* Add padding to the left and right sides */
}

.article-wrapper {
  flex: 0 0 calc(50% - 20px); /* Each article takes up 50% of the container width with 20px margin */
  margin: 10px; /* Add some margin between articles */
}

.article-link {
  text-decoration: none;
  color: black; /* Set text color to black */
}

.article-block {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  height: 100%; /* Set a fixed height for each article block */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

.article-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  font-weight: bold;
}

.date {
  font-style: italic;
}
</style>

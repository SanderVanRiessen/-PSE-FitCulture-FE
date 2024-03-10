<template>
  <div>
    <h1>Articles</h1>
    <div v-if="loading">Loading...</div>
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
      <Paginator v-if="articles.length > 0"
                 :totalRecords="articles.length"
                 :rows="rowsPerPage"
                 @page="onPageChange" />
    </div>
  </div>
</template>
<script>
import { onMounted, ref, computed, watch} from 'vue';
import axios from 'axios';
import Paginator from 'primevue/paginator';
import { formatDate } from '@/utils/dateUtils';

export default {
  name: 'ArticlesPage',
  methods: { formatDate },
  components: { Paginator },
  setup() {
    const articles = ref([]);
    const loading = ref(true);
    const currentPage = ref(1);
    const rowsPerPage = 10;

    const fetchArticles = async () => {
      try {
        const response = await axios.get('/articlesHeadlines');
        articles.value = response.data;
        loading.value = false;
//
      } catch (error) {
        console.error('There was an error fetching the articles:', error);
        loading.value = false;
      }
    };

    const paginatedArticles = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage;
      const end = currentPage.value * rowsPerPage;
      return articles.value.slice(start, end);
    });

    watch(currentPage, (newVal, oldVal) => {
      console.log('currentPage changed from', oldVal, 'to', newVal);
      window.sessionStorage.setItem('currentPage', currentPage.value);
      console.log(window.sessionStorage.getItem('currentPage'));
      window.history.replaceState({ currentPage: currentPage.value }, null);
    });


    const onPageChange = (event) => {
      currentPage.value = event.page + 1; // Paginator is zero-based
    };

    const storePageNumber = () => {
      window.sessionStorage.setItem('currentPage', currentPage.value);
      window.history.replaceState({ currentPage: currentPage.value }, null);
    };


    onMounted(() => {
      // Check if there's a page stored in sessionStorage
      if (window.sessionStorage.getItem('currentPage') === null){
        currentPage.value = 1;
      } else {
        currentPage.value = window.sessionStorage.getItem('currentPage');
      }
      // Then fetch the articles
      fetchArticles();
    });


    return {
      articles,
      paginatedArticles,
      currentPage,
      rowsPerPage,
      onPageChange,
      loading,
      storePageNumber,
    };
  }
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

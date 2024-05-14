<template>
  <div class="flex flex-wrap justify-content-center">
    <div
      v-for="category in categories"
      :key="category.id"
      class="p-col flex align-items-stretch">
      <CategoryCard :category="category" />
    </div>
  </div>
</template>

<script>
import CategoryCard from '@/components/ForumLanding/CategoryCard.vue';
import axios from 'axios';

export default {
  components: {
    CategoryCard,
  },
  data() {
    return {
      categoryName: '',
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios
        .get('/public/forum/frontpage')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error('Failed to fetch categories:', error);
        });
    },
  },
};
</script>

<template>
  <DataView :value="posts">
    <template #list="slotProps">
      <div class="grid grid-nogutter">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="col-12">
          <div
            class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
            :class="{ 'border-top-1 surface-border': index !== 0 }">
            <div class="flex-grow-1">
              <div class="text-xs font-medium">
                Posted by: {{ item.username }}
              </div>
              <div class="text-xs">
                Posted on: {{ formatDateTime(item.createdAt) }}
              </div>
              <p class="mt-2">{{ item.body }}</p>
            </div>
            <Button
              v-if="isAdmin"
              label="Delete Post"
              class="p-button-rounded p-button-danger"
              @click.stop="deletePost(item.id)" />
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<script>
import DataView from 'primevue/dataview';
import { formatDateTime } from '@/utils/dateUtils';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  components: {
    DataView,
  },
  props: {
    posts: Array,
  },
  computed: {
    ...mapGetters(['isAdmin']),
  },
  methods: {
    formatDateTime,
    deletePost(postId) {
      if (!this.isAdmin) {
        return;
      }
      const jwt = localStorage.getItem('token');
      axios
        .delete(`/forum/post/${postId}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then(() => {
          this.$emit('post-deleted', postId);
          this.$toast.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Post successfully deleted',
            life: 3000,
          });
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete post',
            life: 3000,
          });
        });
    },
  },
};
</script>

<style scoped>
.text-xs {
  font-size: 0.75rem; /* Adjust the size as needed */
  color: #666;
}

.font-medium {
  font-weight: 500;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>

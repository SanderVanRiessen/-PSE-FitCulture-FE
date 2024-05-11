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
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<script>
import DataView from 'primevue/dataview';
import { formatDateTime } from '@/utils/dateUtils';

export default {
  components: {
    DataView,
  },
  props: {
    posts: Array,
  },
  methods: {
    formatDateTime,
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

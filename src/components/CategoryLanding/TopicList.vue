<template>
  <DataView :value="topics">
    <template #list="slotProps">
      <div class="grid grid-nogutter">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="col-12">
          <div
            class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
            :class="{ 'border-top-1 surface-border': index !== 0 }">
            <div>
              <div>Created by: {{ item.username }}</div>
              <div>Created on: {{ formatDateTime(item.createdAt) }}</div>
            </div>
            <div
              class="flex flex-column md:flex-row justify-content-center md:align-items-center flex-1 gap-4 cursor-pointer"
              @click="goToTopic(item.id)">
              <div
                class="flex flex-row md:flex-column justify-content-center align-items-center gap-2">
                <div>
                  <div class="text-lg font-medium text-900 mt-2">
                    {{ item.name }}
                  </div>
                </div>
                <div class="surface-100 p-1" style="border-radius: 30px">
                  <span class="text-900 font-medium text-sm">{{
                    item.description
                  }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-column md:align-items-end gap-5">
              <span class="text-xl font-semibold text-900"
                >Posts: {{ item.postCount }}</span
              >
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
    topics: Array,
  },
  data() {
    return {
      layout: 'list', // Default layout
    };
  },
  methods: {
    formatDateTime,
    goToTopic(topicId) {
      this.$router.push(`/forum/topics/${topicId}`);
    },
  },
};
</script>

<template>
  <DataView
    :value="sortedTopics"
    :sort-order="sortOrder"
    :sort-field="sortField">
    <template #header>
      <Dropdown
        v-model="sortKey"
        :options="sortOptions"
        option-label="label"
        placeholder="Sort by"
        @change="onSortChange" />
    </template>
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
                  <span class="text-900 font-medium text-sm">
                    {{ item.description }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-column md:align-items-end gap-5">
              <span class="text-xl font-semibold text-900">
                Posts: {{ item.postCount }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<script>
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import { formatDateTime } from '@/utils/dateUtils';

export default {
  components: {
    DataView,
    Dropdown,
  },
  props: {
    topics: Array,
  },
  data() {
    return {
      sortKey: { field: 'createdAt', order: 1 },
      sortOrder: 1, // 1 for ascending, -1 for descending
      sortField: 'createdAt',
      sortOptions: [
        { label: 'Oldest First', value: { field: 'createdAt', order: 1 } },
        { label: 'Newest First', value: { field: 'createdAt', order: -1 } },
        {
          label: 'Post Count Ascending',
          value: { field: 'postCount', order: 1 },
        },
        {
          label: 'Post Count Descending',
          value: { field: 'postCount', order: -1 },
        },
      ],
    };
  },
  computed: {
    sortedTopics() {
      return [...this.topics].sort((a, b) => {
        let comparison = 0;
        if (a[this.sortField] > b[this.sortField]) {
          comparison = 1;
        } else if (a[this.sortField] < b[this.sortField]) {
          comparison = -1;
        }
        return comparison * this.sortOrder;
      });
    },
  },
  methods: {
    onSortChange(event) {
      console.log(event.value);
      this.sortOrder = event.value.value.order;
      this.sortField = event.value.value.field;
    },
    formatDateTime,
    goToTopic(topicId) {
      this.$router.push(`/forum/topics/${topicId}`);
    },
  },
};
</script>

<template>
  <div>
    <div class="text-xs text-grey">
      <span
        >Posted by {{ topic.username }} on
        {{ new Date(topic.createdAt).toLocaleDateString() }}</span
      >
      <span>| Posts: {{ topic.postCount }}</span>
    </div>
    <div>
      <a
        class="cursor-pointer text-primary hover:underline"
        @click.stop="handleClick"
        >{{ topic.name }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topic: Object,
  },
  methods: {
    handleClick() {
      this.$router.push(`/forum/topics/${this.topic.id}`);
    },
  },
};
</script>

<template>
  <div>
    <TopicStarter :topic-id="topicId" />
    <PostList :posts="posts" />
    <CreatePostComponent
      v-if="isLoggedIn"
      :topic-id="topicId"
      @post-added="fetchPosts" />
    <div v-else>Please sign in to make a post</div>
  </div>
</template>

<script>
import axios from 'axios';
import PostList from '@/components/TopicLanding/PostList.vue';
import CreatePostComponent from '@/components/TopicLanding/CreatePostComponent.vue';
import TopicStarter from '@/components/TopicLanding/TopicStarter.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    TopicStarter,
    PostList,
    CreatePostComponent,
  },
  props: {
    topicId: String,
  },
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios
        .get(`/public/forum/${this.topicId}/posts`)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    },
  },
};
</script>

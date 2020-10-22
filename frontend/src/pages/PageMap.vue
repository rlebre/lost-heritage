<template>
  <q-page class="q-pa-md">
    <MapComponent :posts="posts"></MapComponent>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageMap',

  data() {
    return {
      posts: []
    };
  },

  computed: {
    ...mapGetters('posts', ['postList'])
  },

  watch: {
    postList(newPostList, oldPostList) {
      this.posts = newPostList;
    }
  },

  created() {
    this.posts = this.postList.map(obj => ({
      ...obj,
      clicked: false
    }));
  }
};
</script>

<style lang="scss" scoped></style>

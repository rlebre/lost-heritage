<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-md-6">
        <MapComponent :posts="posts"></MapComponent>
      </div>
      <div class="col-md-6">
        teste test
      </div>
    </div>
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
    postList(newPosts) {
      this.posts = newPosts.map(obj => ({
        ...obj,
        clicked: false
      }));
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

<template>
  <q-page>
    <div class="app-panel row">
      <div class="list-panel col-sm-4 col-md-4">
        <template v-if="posts.length">
          <div class="col-12 q-ma-sm" v-for="post in posts" :key="post.id">
            <ListCardComponent :post="post"></ListCardComponent>
          </div>
        </template>
      </div>
      <div class="col-sm-8 col-md-8">
        <MapComponent :posts="posts"></MapComponent>
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

<style lang="scss" scoped>
.app-panel {
  width: 100%;
  height: 100%;
  position: absolute;
}

.list-panel {
  overflow-y: scroll;
  max-height: 100%;
}

.vue-map-container {
  position: relative;
}

.map-panel {
  flex: 4 1 80%;
}
</style>

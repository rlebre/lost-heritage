<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <template v-if="!isLoadingPosts && posts.length">
        <div class="col-12" v-for="post in posts" :key="post.id">
          <FeedCard :post="post"></FeedCard>
        </div>
      </template>

      <div class="col-12" v-else-if="!isLoadingPosts && !posts.length">
        <h5 class="text-center text-grey">No posts yet.</h5>
      </div>

      <div class="col-12" v-else>
        <q-card flat bordered>
          <q-card-section>
            <q-skeleton type="text" class="text-subtitle2" animation="fade" />
            <q-skeleton
              type="text"
              width="50%"
              class="text-subtitle2"
              animation="fade"
            />
          </q-card-section>

          <q-skeleton class="q-ma-sm" height="200px" animation="fade" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import { mapGetters } from 'vuex';

export default {
  name: 'PageHome',

  computed: {
    ...mapGetters('posts', ['postList', 'isLoadingPosts'])
  },

  data() {
    return {
      posts: [],
      activeComment: ''
    };
  },

  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D, HH:mm');
    }
  },

  watch: {
    postList(newPosts) {
      this.posts = newPosts;
    }
  },

  created() {
    this.posts = this.postList;
  }
};
</script>

<style lang="scss">
.card-post {
  .q-img {
    min-height: 200px;
  }
  .text-caption {
    font-size: 0.8rem;
  }
}
</style>

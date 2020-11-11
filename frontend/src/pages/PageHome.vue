<template>
  <q-page class="constrain q-pa-md">
    <PostFilter @onFilterChanged="postFilterChanged"></PostFilter>
    <div class="row q-col-gutter-lg">
      <template v-if="!isLoadingPosts && filteredPosts && filteredPosts.length">
        <div class="col-12" v-for="post in filteredPosts" :key="post.id">
          <FeedCard :post="post"></FeedCard>
        </div>
      </template>

      <div class="col-12" v-else-if="!isLoadingPosts && !filteredPosts">
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PageHome',

  computed: {
    ...mapGetters('posts', ['postList', 'isLoadingPosts', 'filteredPostList'])
  },

  data() {
    return {
      activeComment: '',
      filteredPosts: []
    };
  },

  created() {
    this.filteredPosts = this.postList;
  },

  watch: {
    postList(newValue, oldValue) {
      this.filteredPosts = this.postList;
    },
    filteredPostList(n, o) {
      this.filteredPosts = this.filteredPostList;
    }
  },

  methods: {
    ...mapActions('posts', ['searchPosts']),

    postFilterChanged(filterOptions) {
      const { selectedOptions, sortBy, sortType, searchString } = filterOptions;

      if (searchString) {
        this.searchPosts({ query: searchString, sortBy, sortType });
      } else {
        this.filteredPosts = this.postList;
      }

      if (selectedOptions.length > 0) {
        this.filteredPosts = this.filteredPosts.filter(post => {
          return selectedOptions.includes(post.county);
        });
      }

      if (!searchString && selectedOptions.length === 0) {
        this.filteredPosts = this.postList;
      }

      if (sortBy) {
        this.filteredPosts.sort(this.$dynamicSort(filterOptions.sortBy));
      }

      this.filteredPosts.sort(
        this.$dynamicSort(filterOptions.sortBy, sortType === 'desc' ? -1 : 1)
      );
    }
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

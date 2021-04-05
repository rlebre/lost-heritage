<template>
  <q-page class="constrain q-pa-md">
    <PostFilter @onFilterChanged="postFilterChanged" />

    <q-pull-to-refresh @refresh="refreshPosts">
      <q-infinite-scroll class="w-100" @load="loadMorePosts" :offset="10">
        <template v-if="isLoadingPosts" v-slot:loading>
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <q-skeleton type="text" class="text-subtitle2" animation="fade" />
                <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
              </q-card-section>

              <q-skeleton class="q-ma-sm" height="200px" animation="fade" />
            </q-card>
          </div>
        </template>
        <q-intersection
          v-for="post in filteredPosts"
          :key="post.id"
          class="col-12 intersection-card"
          ssr-prerender
          once
        >
          <FeedCard :post="post" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FeedCard from 'components/feed/FeedCard';
import PostFilter from 'components/common/PostFilter';

export default {
  name: 'PageHome',

  components: {
    FeedCard,
    PostFilter
  },

  computed: {
    ...mapGetters('posts', [
      'postList',
      'isLoadingPosts',
      'filteredPostList',
      'postListHasNextPage',
      'lastFetchedPage'
    ])
  },

  data() {
    return {
      filteredPosts: []
    };
  },

  created() {
    this.filteredPosts = this.postList;
  },

  watch: {
    postList(newValue) {
      this.filteredPosts = this.postList;
    }
  },

  methods: {
    ...mapActions('posts', ['searchPosts', 'fetchPosts', 'fetchNextPosts']),

    postFilterChanged(filterOptions) {
      const { selectedOptions, sortBy, sortType, searchString } = filterOptions;

      if (searchString) {
        this.searchPosts({ query: searchString, sortBy, sortType }).then(
          (data) => {
            this.filteredPosts = data;
          },
          (errors) => {
            this.$q.notify({
              message: errors[0].title,
              caption: errors[0].detail,
              timeout: 1000
            });
          }
        );
      } else {
        this.filteredPosts = this.postList;
      }

      if (selectedOptions.length > 0) {
        this.filteredPosts = this.filteredPosts.filter((post) => {
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
    },

    refreshPosts(done) {
      this.fetchPosts(10).then(
        (data) => {
          done();
          this.$q.notify({
            message: 'Posts updated successfully.',
            timeout: 1000
          });
        },
        (errors) => {
          done();
          this.$q.notify({
            message: errors[0].title,
            caption: errors[0].detail,
            timeout: 1000
          });
        }
      );
    },

    loadMorePosts(index, doneLoadingState) {
      if (this.postList.length == 0 && !this.isLoadingPosts) {
        this.fetchPosts(10).then(doneLoadingState());
      } else if (this.postList.length > 0 && this.postListHasNextPage) {
        this.fetchNextPosts({ limit: 10, page: this.lastFetchedPage + 1 }).then(
          (data) => {
            doneLoadingState();
          },
          (errors) => {
            this.$q.notify({
              message: errors[0].title,
              caption: errors[0].detail,
              timeout: 1000
            });

            doneLoadingState();
          }
        );
      } else {
        doneLoadingState();
      }
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

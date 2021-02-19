<template>
  <q-page class="constrain q-pa-md">
    <q-pull-to-refresh @refresh="refreshPosts">
      <PostFilter @onFilterChanged="postFilterChanged"></PostFilter>
      <div class="row q-col-gutter-lg">
        <template
          v-if="!isLoadingPosts && filteredPosts && filteredPosts.length"
        >
          <q-intersection
            v-for="post in filteredPosts"
            :key="post.id"
            class="col-12 intersection-card"
            ssr-prerender
            once
          >
            <FeedCard :post="post" />
          </q-intersection>
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
    ...mapGetters('posts', ['postList', 'isLoadingPosts', 'filteredPostList'])
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
    postList(newValue, oldValue) {
      this.filteredPosts = this.postList;
    },
    filteredPostList(n, o) {
      this.filteredPosts = this.filteredPostList;
    }
  },

  methods: {
    ...mapActions('posts', ['searchPosts', 'fetchPosts']),

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
    },

    refreshPosts(done) {
      this.fetchPosts().then(
        data => {
          done();
          this.$q.notify({
            message: 'Posts updated successfully.',
            timeout: 1000
          });
        },
        errors => {
          done();
          this.$q.notify({
            message: errors[0].title,
            caption: errors[0].detail,
            timeout: 1000
          });
        }
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

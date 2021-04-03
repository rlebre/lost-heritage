<template>
  <q-page>
    <PostFilter class="q-px-md q-pt-sm" @onFilterChanged="postFilterChanged" />
    <div class="large-screen-only">
      <div class="app-panel row">
        <div class="list-panel col-sm-4 col-md-4">
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
                class="col-12 q-ml-md q-mr-sm q-pb-sm"
                ssr-prerender
                once
              >
                <ListCardComponent :post="post" @viewOnMap="onListCardViewOnMap" />
              </q-intersection>
            </q-infinite-scroll>
          </q-pull-to-refresh>
        </div>
        <div class="col-sm-8 col-md-8 q-pr-md">
          <MapComponent :posts="filteredPosts" :postToFocus="postToFocus"></MapComponent>
        </div>
      </div>
    </div>

    <div class="small-screen-only">
      <div class="app-panel row" style="padding-bottom: 48px">
        <MapComponent :posts="filteredPosts" :postToFocus="postToFocus"></MapComponent>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MapComponent from 'components/map/MapComponent';
import ListCardComponent from 'components/map/ListCardComponent';
import PostFilter from 'components/common/PostFilter';

export default {
  name: 'PageMap',

  components: {
    MapComponent,
    ListCardComponent,
    PostFilter
  },

  data() {
    return {
      filteredPosts: [],
      postToFocus: null
    };
  },

  computed: {
    ...mapGetters('posts', [
      'postListWithClickField',
      'isLoadingPosts',
      'filteredPostList',
      'postListHasNextPage',
      'lastFetchedPage'
    ])
  },

  created() {
    this.filteredPosts = this.postListWithClickField;
  },

  watch: {
    postListWithClickField(newValue, oldValue) {
      this.filteredPosts = this.postListWithClickField;
    },

    filteredPostList(n, o) {
      this.filteredPosts = this.filteredPostList;
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
        this.filteredPosts = this.postListWithClickField;
      }

      if (selectedOptions.length > 0) {
        this.filteredPosts = this.filteredPosts.filter((post) => {
          return selectedOptions.includes(post.county);
        });
      }

      if (!searchString && selectedOptions.length === 0) {
        this.filteredPosts = this.postListWithClickField;
      }

      if (sortBy) {
        this.filteredPosts.sort(this.$dynamicSort(filterOptions.sortBy));
      }

      this.filteredPosts.sort(this.$dynamicSort(filterOptions.sortBy, sortType === 'desc' ? -1 : 1));
    },

    onListCardViewOnMap(post) {
      this.postToFocus = post;
    },

    refreshPosts(done) {
      this.fetchPosts().then(
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
      if (this.filteredPosts.length == 0) {
        this.fetchPosts(10).then(doneLoadingState());
      } else if (this.filteredPosts.length > 0 && this.postListHasNextPage) {
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

<style lang="scss" scoped>
.app-panel {
  width: 100%;
  position: absolute;
}

.small-screen-only > .app-panel {
  height: 100%;
}

.large-screen-only > .app-panel {
  height: calc(100% - 70px);
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

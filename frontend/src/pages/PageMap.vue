<template>
  <q-page>
    <PostFilter
      @onFilterChanged="postFilterChanged"
      class="q-pa-md"
    ></PostFilter>
    <div class="large-screen-only">
      <div class="app-panel row">
        <div class="list-panel col-sm-4 col-md-4">
          <template v-if="filteredPosts.length">
            <div
              class="col-12 q-ma-sm"
              v-for="post in filteredPosts"
              :key="post.id"
            >
              <ListCardComponent :post="post"></ListCardComponent>
            </div>
          </template>
        </div>
        <div class="col-sm-8 col-md-8">
          <MapComponent :posts="filteredPosts"></MapComponent>
        </div>
      </div>
    </div>

    <div class="small-screen-only">
      <div class="app-panel row">
        <MapComponent :posts="filteredPosts"></MapComponent>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PageMap',

  data() {
    return {
      filteredPosts: []
    };
  },

  computed: {
    ...mapGetters('posts', [
      'postListWithClickField',
      'isLoadingPosts',
      'filteredPostList'
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
    ...mapActions('posts', ['searchPosts']),

    postFilterChanged(filterOptions) {
      const { selectedOptions, sortBy, sortType, searchString } = filterOptions;

      if (searchString) {
        this.searchPosts({ query: searchString, sortBy, sortType });
      } else {
        this.filteredPosts = this.postListWithClickField;
      }

      if (selectedOptions.length > 0) {
        this.filteredPosts = this.filteredPosts.filter(post => {
          return selectedOptions.includes(post.county);
        });
      }

      if (!searchString && selectedOptions.length === 0) {
        this.filteredPosts = this.postListWithClickField;
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

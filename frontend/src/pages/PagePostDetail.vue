<template>
  <q-page class="constrain q-pa-md">
    <div class="col-12">
      <h4 class="text-h4 text-bold q-ma-sm ">{{ post.title | capitalize }}</h4>
    </div>
    <div class="col-12">
      <q-carousel
        swipeable
        arrows
        animated
        v-model="slideNumber"
        thumbnails
        infinite
        :fullscreen.sync="fullscreen"
      >
        <q-carousel-slide
          class="uncropped-image"
          v-for="(image, index) in post.images"
          :key="`blabla${index}`"
          :name="index"
          :img-src="image"
        />
        <template v-slot:control>
          <q-carousel-control position="bottom-right" :offset="[18, 18]">
            <q-btn
              push
              round
              dense
              color="white"
              text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>

    <span>{{ post }}</span>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PagePost',

  data() {
    return {
      post: {},
      slideNumber: 0,
      fullscreen: false
    };
  },

  watch: {
    postDetails(newValue, oldValue) {
      this.post = newValue;
    }
  },

  methods: {
    ...mapActions('posts', ['fetchPostDetails'])
  },

  computed: {
    ...mapGetters('posts', ['isLoadingPosts', 'postDetails'])
  },

  created() {
    this.fetchPostDetails(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
.uncropped-image {
  background-size: contain; /* don't crop the image  */
  background-repeat: no-repeat; /* only show the image one time  */
  //background-color: grey; /* color to fill empty space with  */
}
</style>

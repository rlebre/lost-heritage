<template>
  <q-page class="constrain-less q-pa-md">
    <div class="upper-section">
      <div class="row">
        <div class="col-12 col-md-6">
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

        <div class="col-12 col-md-6">
          <!-- <MapComponent style="max-width:100%" :posts="[post]"></MapComponent> -->
          MAP
        </div>
      </div>
    </div>

    <div class="details-section">
      <div class="details-section-header q-mb-md">
        <div class="row">
          <h3
            :class="
              `col-12 building-status building-${
                post.isRecovered ? 'recovered' : 'not-recovered'
              }`
            "
          >
            {{ post.isRecovered ? 'Recovered' : 'Needs recovery' }}
          </h3>
          <h1 class="col-12 q-my-sm building-title">
            {{ post.title | capitalize }}
          </h1>
          <h2 class="col-12 building-county">
            {{ post.county | capitalize }}
          </h2>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-8">
          <hr class="q-mb-lg" />

          <h2 class="building-details-title">Details</h2>
          <p class="rental-description">
            {{ post.details }}
          </p>

          <h2 class="building-details-title" v-if="post.stories">Stories</h2>
          <p class="rental-description">
            {{ post.stories }}
          </p>

          <h2 class="building-details-title" v-if="post.previousFunctions">
            Previous functions
          </h2>
          <p class="rental-description">
            {{ post.previousFunctions }}
          </p>

          <h2 class="building-details-title" v-if="post.suggestedFunctions">
            Suggested functions
          </h2>
          <p class="rental-description">
            {{ post.suggestedFunctions }}
          </p>

          <div class="rental-rating">
            <span>2 / 5</span>
          </div>
        </div>

        <div class="col-12 col-md-4">
          olaaa
        </div>
      </div>
    </div>

    <!-- <span>{{ post }}</span> -->
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MapComponent from '../components/map/MapComponent.vue';

export default {
  components: { MapComponent },
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

.upper-section {
  margin-bottom: 30px;
}

.building {
  &-status {
    font-size: 14px;
    font-weight: 500;
    line-height: 0;
  }

  &-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 2rem;
  }

  &-county {
    font-size: 16px;
    font-weight: 600;
    line-height: 0;
  }

  &-details-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0;
  }
}
</style>

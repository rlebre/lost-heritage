<template>
  <q-page class="constrain q-pa-md" v-if="postDetails">
    <div class="upper-section">
      <div class="row">
        <div class="small-screen-only details-section q-ma-sm">
          <div class="details-section-header">
            <div class="row">
              <h3
                :class="`col-12 building-status building-${
                  postDetails.isRecovered ? 'recovered' : 'not-recovered'
                }`"
              >
                {{ postDetails.isRecovered ? $t('create.recovered') : $t('create.needsRecovered') }}
              </h3>
              <h1 class="col-12 q-my-sm building-title text-capitalize">
                {{ postDetails.title }}
              </h1>
              <h2 class="col-12 building-county text-capitalize">
                {{ postDetails.county }}
              </h2>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 q-pa-sm">
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
              v-for="(image, index) in postDetails.images"
              :key="`img-${index}`"
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

        <div
          class="col-12 col-md-6 q-pa-sm"
          style="min-height: 300px"
          v-if="postDetails.lat && postDetails.lng"
        >
          <l-map
            :zoom="9"
            :center="latLng(postDetails.lat, postDetails.lng)"
            :options="{ dragging: false }"
          >
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-marker :lat-lng="latLng(postDetails.lat, postDetails.lng)">
              <l-icon
                :icon-size="[25, 25]"
                icon-url="map-pins/blue.png"
                shadowUrl=""
                :clickable="false"
                :draggable="false"
              />
            </l-marker>
          </l-map>
        </div>
      </div>
    </div>

    <div class="details-section q-ma-sm">
      <div class="large-screen-only details-section-header">
        <div class="row">
          <h3
            :class="`col-12 building-status building-${
              postDetails.isRecovered ? 'recovered' : 'not-recovered'
            }`"
          >
            {{ postDetails.isRecovered ? $t('details.recovered') : $t('details.needsRecovery') }}
          </h3>
          <h1 class="col-12 q-my-sm building-title first-letter-uppercase">
            {{ postDetails.title }}
          </h1>
          <h2 class="col-12 building-county first-letter-uppercase">
            {{ postDetails.county }}
          </h2>
        </div>
      </div>

      <hr class="q-my-lg" />

      <div class="row">
        <div class="col-12 q-pr-sm">
          <h2 class="building-details-title first-letter-uppercase">
            {{ $t('details.details') }}
          </h2>
          <p class="rental-description">
            {{ postDetails.details }}
          </p>

          <h2 class="building-details-title first-letter-uppercase" v-if="postDetails.stories">
            {{ $t('details.stories') }}
          </h2>
          <p class="rental-description">
            {{ postDetails.stories }}
          </p>

          <h2
            class="building-details-title first-letter-uppercase"
            v-if="postDetails.previousFunctions"
          >
            {{ $t('details.previousFunctions') }}
          </h2>
          <p class="rental-description">
            {{ postDetails.previousFunctions }}
          </p>

          <h2
            class="building-details-title first-letter-uppercase"
            v-if="postDetails.suggestedFunctions"
          >
            {{ $t('details.suggestedFunctions') }}
          </h2>
          <p class="rental-description">
            {{ postDetails.suggestedFunctions }}
          </p>
        </div>
      </div>

      <hr class="q-my-lg q-mb-lg" />

      <div class="row">
        <h2 class="building-details-title first-letter-uppercase">
          {{ $t('details.comments') }}
        </h2>

        <CommentsBox
          class="col-12 small-screen-only q-px-xs"
          v-if="postDetails"
          :comments="postDetails.comments"
          :postId="postDetails._id"
        />
        <CommentsBox
          class="col-12 large-screen-only q-px-sm"
          v-if="postDetails"
          :comments="postDetails.comments"
          :postId="postDetails._id"
        />
      </div>
    </div>
  </q-page>

  <q-page class="constrain q-pa-md" v-else>
    <q-spinner class="fixed-center" color="primary" size="3em" :thickness="10" />
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MapComponent from 'components/map/MapComponent.vue';
import CommentsBox from 'components/post-details/CommentsBox';
import PinInfoWindow from 'components/map/PinInfoWindow';

import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet';
import { latLng } from 'leaflet';

import 'leaflet/dist/leaflet.css';

export default {
  name: 'PagePost',

  components: {
    MapComponent,
    PinInfoWindow,
    CommentsBox,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },

  data() {
    return {
      slideNumber: 0,
      fullscreen: false,

      center: {
        lat: 48.853,
        lng: 2.298
      },
      path: [
        {
          lat: 48.853,
          lng: 2.298
        },
        {
          lat: 48.8735,
          lng: 2.2951
        }
      ],
      options: {},
      userPosition: null,

      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, \
        &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> \
        &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      latLng
    };
  },

  methods: {
    ...mapActions('posts', ['fetchPostDetails'])
  },

  computed: {
    ...mapGetters('posts', ['isLoadingPosts', 'postDetails']),

    url() {
      const isDark = this.$q.dark.isActive ? 'alidade_smooth_dark' : 'alidade_smooth';
      return `https://tiles.stadiamaps.com/tiles/${isDark}/{z}/{x}/{y}{r}.png?api_key=${process.ENV.MAP_KEY}`;
    }
  },

  async preFetch({ store, currentRoute }) {
    await store.dispatch('posts/fetchPostDetails', currentRoute.params.id);
  },

  meta() {
    return {
      title: this.metaTitle,
      meta: {
        title: {
          name: 'title',
          content: this.postDetails && this.postDetails.title
        },
        ogTitle: {
          property: 'og:title',
          content: this.postDetails && this.postDetails.title
        },
        twitterTitle: {
          property: 'twitter:title',
          content: this.postDetails && this.postDetails.title
        },

        description: {
          property: 'description',
          content: this.postDetails && this.postDetails.details
        },
        ogDescription: {
          property: 'og:description',
          content: this.postDetails && this.postDetails.details
        },
        twitterDescription: {
          property: 'twitter:description',
          content: this.postDetails && this.postDetails.details
        },

        ogUrl: {
          property: 'og:url',
          content: `${process.env.PRODUCTION_URL}${this.$route.path}`
        },
        twitterUrl: {
          property: 'twitter:url',
          content: `${process.env.PRODUCTION_URL}${this.$route.path}`
        },

        ogImage: {
          property: 'og:image',
          content: this.postDetails && this.postDetails.images[0]
        },
        twitterImage: {
          property: 'twitter:url',
          content: this.postDetails && this.postDetails.images[0]
        },

        ogType: {
          property: 'og:type',
          content: 'website'
        },

        twitterCard: {
          property: 'twitter:card',
          content: 'summary_large_image'
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.uncropped-image {
  background-size: contain;
  background-repeat: no-repeat;
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

<style lang="scss" scoped>
.body--dark {
  .q-page {
    color: $grey-13 !important;
  }
}
</style>

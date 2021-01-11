<template>
  <q-page class="constrain q-pa-md" v-if="post">
    <div class="upper-section admin-banner bg-grey-2">
      <q-btn
        size="18px"
        round
        flat
        color="primary"
        icon="eva-arrow-circle-left"
        @click="$router.go(-1)"
      >
        <q-tooltip>Return</q-tooltip>
      </q-btn>

      <div class="q-space"></div>

      <q-btn size="18px" round flat color="warning" icon="eva-edit" disabled>
        <q-tooltip>Edit post</q-tooltip>
      </q-btn>

      <q-btn size="18px" round flat color="negative" icon="eva-close-circle">
        <q-tooltip>Decline post</q-tooltip>
      </q-btn>

      <q-btn size="18px" round flat color="green" icon="eva-checkmark-circle-2">
        <q-tooltip>Approve post</q-tooltip>
      </q-btn>
    </div>

    <div class="upper-section">
      <div class="row">
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
              v-for="(image, index) in post.images"
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

        <div class="col-12 col-md-6 q-pa-sm" v-if="post.lat && post.lng">
          <googlemaps-map
            ref="map"
            class="map fit googlemaps-map"
            :center="{ lat: post.lat, lng: post.lng }"
            :zoom.sync="zoom"
            :options="{
              mapTypeControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
              disableDefaultUI: false,
              draggable: false,
              styles: $q.dark.isActive ? styleDark : styleLight
            }"
          >
            <googlemaps-marker :position="{ lat: post.lat, lng: post.lng }" />
          </googlemaps-map>
        </div>
      </div>
    </div>

    <div class="details-section q-ma-sm">
      <div class="details-section-header">
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

      <hr class="q-my-lg" />

      <div class="row">
        <div class="col-12 col-md-8 q-pr-sm">
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
      </div>

      <hr class="q-my-lg q-mb-lg" />

      <div class="row">
        <h2 class="building-details-title">Comments</h2>

        <CommentsBox
          class="col-12 small-screen-only q-px-xs"
          :comments="post.comments"
          :postId="post._id"
        ></CommentsBox>
        <CommentsBox
          class="col-12 large-screen-only q-px-sm"
          :comments="post.comments"
          :postId="post._id"
        ></CommentsBox>
      </div>
    </div>
  </q-page>

  <q-page class="constrain q-pa-md" v-else>
    <q-spinner
      class="fixed-center"
      color="primary"
      size="3em"
      :thickness="10"
    />
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MapComponent from '../../components/map/MapComponent.vue';

export default {
  components: { MapComponent },
  name: 'AdminPostDetails',

  data() {
    return {
      post: null,
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
      zoom: 10,

      styleLight: [
        {
          featureType: 'administrative.neighborhood',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi.business',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.local',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        }
      ],
      styleDark: [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#212121'
            }
          ]
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#212121'
            }
          ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          featureType: 'administrative.country',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        },
        {
          featureType: 'administrative.land_parcel',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#bdbdbd'
            }
          ]
        },
        {
          featureType: 'administrative.neighborhood',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          featureType: 'poi.business',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#181818'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#1b1b1b'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#2c2c2c'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#8a8a8a'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#373737'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#3c3c3c'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [
            {
              color: '#4e4e4e'
            }
          ]
        },
        {
          featureType: 'road.local',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161'
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#3d3d3d'
            }
          ]
        }
      ]
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
.googlemaps-map {
  min-height: 300px;
}

.uncropped-image {
  background-size: contain; /* don't crop the image  */
  background-repeat: no-repeat; /* only show the image one time  */
  //background-color: grey; /* color to fill empty space with  */
}

.upper-section {
  margin-bottom: 30px;
}

.admin-banner {
  display: flex;
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

<template>
  <q-page class="constrain q-pa-md" v-if="post">
    <div class="upper-section admin-banner bg-grey-2 rounded-borders">
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

      <q-toggle
        size="52px"
        round
        flat
        dense
        color="warning"
        icon="eva-edit"
        v-model="editable"
        keep-color
      >
        <q-tooltip>Edit post</q-tooltip>
      </q-toggle>

      <q-btn
        size="18px"
        dense
        round
        flat
        color="negative"
        icon="eva-close-circle"
      >
        <q-tooltip>Decline post</q-tooltip>
      </q-btn>

      <q-btn
        size="18px"
        dense
        round
        flat
        color="green"
        icon="eva-checkmark-circle-2"
      >
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
          <EditableToggle
            :default="post.isRecovered"
            entityField="isRecovered"
            class="col-12 q-my-sm"
            @inputChanged="inputChanged"
            :doneState="inputDoneState.isRecovered"
            :editable="editable"
          />

          <EditableInput
            :defaultText="post.title"
            placeholder="Title"
            entityField="title"
            class="col-12 q-my-sm"
            className="building-title"
            inputClass="text-bold"
            @inputChanged="inputChanged"
            :doneState="inputDoneState.title"
            :editable="editable"
            @editing="editableBeingEdited"
          />

          <EditableSelect
            :default="post.county"
            entityField="county"
            class="col-12 q-my-sm"
            inputClass="text-bold text-capitalize"
            @inputChanged="inputChanged"
            :doneState="inputDoneState.county"
            :editable="editable"
          />
        </div>
      </div>

      <hr class="q-my-lg" />

      <div class="row">
        <div class="col-12 q-pr-sm">
          <EditableInput
            :defaultText="post.details"
            title="Details"
            placeholder="Details"
            entityField="details"
            @inputChanged="inputChanged"
            :doneState="inputDoneState.details"
            :editable="editable"
            @editing="editableBeingEdited"
          />

          <EditableInput
            :defaultText="post.stories || ''"
            title="Stories"
            placeholder="No stories inserted."
            entityField="stories"
            @inputChanged="inputChanged"
            :doneState="inputDoneState.stories"
            :editable="editable"
            @editing="editableBeingEdited"
          />

          <EditableInput
            :defaultText="post.previousFunctions || ''"
            title="Previous functions"
            placeholder="No previous functions inserted."
            entityField="previousFunctions"
            @inputChanged="inputChanged"
            :doneState="inputDoneState.previousFunctions"
            :editable="editable"
            @editing="editableBeingEdited"
          />

          <EditableInput
            :defaultText="post.previousFunctions || ''"
            title="Suggested functions"
            placeholder="No suggested functions inserted."
            entityField="suggestedFunctions"
            @inputChanged="inputChanged"
            :doneState="inputDoneState.suggestedFunctions"
            :editable="editable"
            @editing="editableBeingEdited"
          />
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
      editable: false,
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

      inputLoadingState: false,
      inputDoneState: {},

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
    ...mapActions('posts', ['fetchPostDetails', 'editPost']),

    inputChanged(evt) {
      this.$set(this.post, evt.key, evt.value);
      this.$set(this.inputDoneState, evt.key, true);
      this.editPost(this.post).then(
        data => {
          this.$q.notify({
            message: 'Post edited successfully',
            timeout: 3000
          });
          this.$set(this.inputDoneState, evt.key, true);
        },
        errors => {
          this.$q.notify({
            message: errors[0].title,
            caption: errors[0].detail,
            timeout: 3000
          });
          this.$set(this.inputDoneState, evt.key, true);
        }
      );
    },

    editableBeingEdited(evt) {
      this.$set(this.inputDoneState, evt, false);
    }
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
  margin-bottom: 20px;
}

.admin-banner {
  display: flex;

  // @media (max-width: $breakpoint-xs-max) {
  //   margin-top: 50px;
  //   z-index: 100;
  // }

  // @media (min-width: $breakpoint-sm-min) {
  //   position: fixed;
  //   width: 100%;
  //   top: 77px;
  //   z-index: 100;
  // }
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

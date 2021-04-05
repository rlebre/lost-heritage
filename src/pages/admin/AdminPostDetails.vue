<template>
  <q-page class="constrain q-pa-md" v-if="post">
    <AdminBar :post="post" :editModeOn="editable" @editModeChanged="editable = !editable" />

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
          <l-map :zoom="9" :center="[post.lat, post.lng]" :options="{ dragging: false }">
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-marker :lat-lng="[post.lat, post.lng]">
              <l-icon
                :icon-size="[25, 25]"
                icon-url="map-pins/blue.png"
                :clickable="true"
                :draggable="true"
              />
            </l-marker>
          </l-map>
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
            :defaultText="post.suggestedFunctions || ''"
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
    <q-spinner class="fixed-center" color="primary" size="3em" :thickness="10" />
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MapComponent from 'components/map/MapComponent.vue';
import CommentsBox from 'components/post-details/CommentsBox';
import EditableInput from 'components/post-details/editable/EditableInput';
import EditableSelect from 'components/post-details/editable/EditableSelect';
import EditableToggle from 'components/post-details/editable/EditableToggle';
import AdminBar from 'components/admin/AdminBar';

let Vue2Leaflet = {};

if (!process.env.SERVER) {
  console.log('loading vue2-leaflet');
  Vue2Leaflet = require('vue2-leaflet');
}

import 'leaflet/dist/leaflet.css';

export default {
  name: 'AdminPostDetails',

  components: {
    MapComponent,
    CommentsBox,
    EditableInput,
    EditableSelect,
    EditableToggle,
    AdminBar,
    'l-map': Vue2Leaflet.LMap,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-marker': Vue2Leaflet.LMarker,
    'l-popup': Vue2Leaflet.LPopup,
    'l-icon': Vue2Leaflet.LIcon
  },

  props: {
    editModeOn: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      editable: this.editModeOn,
      post: null,
      slideNumber: 0,
      fullscreen: false,

      center: [48.853, 2.298],
      options: {},
      userPosition: null,
      zoom: 10,

      inputLoadingState: false,
      inputDoneState: {},
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, \
        &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> \
        &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    };
  },

  watch: {
    postDetails(newValue, oldValue) {
      this.post = newValue;
    }
  },

  methods: {
    ...mapActions('posts', ['fetchPostDetails', 'editPost', 'approvePost', 'declinePost']),

    inputChanged(evt) {
      this.$set(this.post, evt.key, evt.value);
      this.$set(this.inputDoneState, evt.key, true);
      this.editPost(this.post).then(
        (data) => {
          this.$q.notify({
            message: 'Post edited successfully',
            timeout: 3000
          });
          this.$set(this.inputDoneState, evt.key, true);
        },
        (errors) => {
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
    ...mapGetters('posts', ['isLoadingPosts', 'postDetails']),

    url() {
      const isDark = this.$q.dark.isActive ? 'alidade_smooth_dark' : 'alidade_smooth';
      return `https://tiles.stadiamaps.com/tiles/${isDark}/{z}/{x}/{y}{r}.png?api_key=${process.env.MAP_KEY}`;
    }
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

<template>
  <l-map :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution" />
    <l-marker
      :key="`marker-${post._id}`"
      :ref="`marker-${post._id}`"
      :lat-lng="latLng(post.lat, post.lng)"
      v-for="post in posts"
    >
      <l-icon
        :icon-size="[25, 25]"
        :icon-url="`map-pins/${post.isRecovered ? 'green.png' : 'pink.png'}`"
        shadowUrl=""
        :clickable="true"
        :draggable="false"
      />
      <l-popup class="stylePopup">
        <PinInfoWindow :post="post" />
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import PinInfoWindow from 'components/map/PinInfoWindow';
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet';
import { latLng } from 'leaflet';

import 'leaflet/dist/leaflet.css';

export default {
  name: 'Map',

  props: {
    posts: {
      type: Array
    }
  },

  components: {
    PinInfoWindow,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },

  data() {
    return {
      postToOpen: {},
      latLng,
      filteredPosts: [],
      zoom: 7,
      center: latLng(39.7330017, -7.6897566),
      shadowUrl: '',
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, \
        &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> \
        &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    };
  },

  computed: {
    url() {
      const isDark = this.$q.dark.isActive ? 'alidade_smooth_dark' : 'alidade_smooth';
      return `https://tiles.stadiamaps.com/tiles/${isDark}/{z}/{x}/{y}{r}.png`;
    }
  },

  methods: {
    togglePopup(postId) {
      this.$refs[`marker-${postId}`][0].mapObject.togglePopup();
    }
  }
};
</script>

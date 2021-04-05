<template>
  <l-map :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution" />
    <l-marker
      :key="`marker-${post._id}`"
      :ref="`marker-${post._id}`"
      :lat-lng="[post.lat, post.lng]"
      v-for="post in posts"
    >
      <l-icon
        :icon-size="[25, 25]"
        :icon-url="`map-pins/${post.isRecovered ? 'green.png' : 'pink.png'}`"
        shadowUrl=""
        :clickable="true"
        :draggable="false"
      />
      <l-popup>
        <PinInfoWindow :post="post" />
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import PinInfoWindow from 'components/map/PinInfoWindow';

let Vue2Leaflet = {};

if (!process.env.SERVER) {
  console.log('loading vue2-leaflet');
  Vue2Leaflet = require('vue2-leaflet');
}

import 'leaflet/dist/leaflet.css';

export default {
  name: 'Map',

  props: {
    posts: {
      type: Array
    },
    postToFocus: {
      type: Object
    }
  },

  components: {
    PinInfoWindow,
    'l-map': Vue2Leaflet.LMap,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-marker': Vue2Leaflet.LMarker,
    'l-popup': Vue2Leaflet.LPopup,
    'l-icon': Vue2Leaflet.LIcon
  },

  data() {
    return {
      postToOpen: null,
      filteredPosts: [],
      zoom: 7,
      center: [39.7330017, -7.6897566],
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
      return `https://tiles.stadiamaps.com/tiles/${isDark}/{z}/{x}/{y}{r}.png?api_key=${process.env.MAP_KEY}`;
    }
  },

  watch: {
    postToOpen(newVal) {
      if (newVal) {
        this.togglePopup(newVal._id);
      }
    },

    postToFocus(newVal) {
      this.postToOpen = newVal;
    }
  },

  methods: {
    togglePopup(postId) {
      this.$refs[`marker-${postId}`][0].mapObject.togglePopup();
    }
  },

  mounted() {
    this.$nextTick(() => {
      for (const ref in this.$refs) {
        this.$refs[ref][0].mapObject.on('popupclose', (e) => {
          this.postToOpen = null;
          this.$emit('popupclosed', ref);
        });
      }

      this.postToOpen = this.postToFocus;
    });
  }
};
</script>

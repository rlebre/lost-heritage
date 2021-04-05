<template>
  <l-map
    :zoom="7"
    :center="latLng(39.7330017, -7.6897566)"
    @update:center="centerUpdated"
    ref="lmap"
  >
    <l-tile-layer :url="url" :attribution="attribution" />
    <l-marker :lat-lng="pickedLocation" ref="pickerMarker">
      <l-icon
        :icon-size="[25, 25]"
        icon-url="map-pins/blue.png"
        shadowUrl=""
        :clickable="false"
        :draggable="false"
      />

      <l-popup> {{ $t('c.locationPicker.tooltip') }} </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet';
import { latLng } from 'leaflet';

import 'leaflet/dist/leaflet.css';

export default {
  name: 'Map',

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },

  data() {
    return {
      pickedLocation: latLng(39.7330017, -7.6897566),
      latLng,
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, \
        &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> \
        &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    };
  },

  methods: {
    centerUpdated(newLocation) {
      this.pickedLocation = newLocation;
      this.$emit('centerUpdated', this.pickedLocation);
    }
  },

  computed: {
    url() {
      const isDark = this.$q.dark.isActive ? 'alidade_smooth_dark' : 'alidade_smooth';
      return `https://tiles.stadiamaps.com/tiles/${isDark}/{z}/{x}/{y}{r}.png?api_key=${process.env.MAP_KEY}`;
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.lmap.mapObject.on('drag', (e) => {
        this.pickedLocation = e.target.getCenter();
      });

      this.$refs.pickerMarker.mapObject.openPopup();
    });
  }
};
</script>

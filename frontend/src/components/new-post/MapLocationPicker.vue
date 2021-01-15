<template>
  <googlemaps-map
    ref="mapLocationPicker"
    class="map fit googlemaps-map"
    style="position:unset"
    :center.sync="pickedLocation"
    :zoom="7"
    :options="{
      mapTypeControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUI: false,
      styles: $q.dark.isActive ? styleDark : styleLight
    }"
  >
    <googlemaps-marker
      :position="pickedLocation"
      :draggable="false"
      icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    >
    </googlemaps-marker>
  </googlemaps-map>
</template>

<script>
import { styleLight, styleDark } from '../../helpers/map-styles';

export default {
  name: 'Map',

  data() {
    return {
      pickedLocation: { lat: 39.7330017, lng: -7.6897566 },
      styleLight,
      styleDark
    };
  },

  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D, HH:mm');
    }
  },

  methods: {
    updateCenter(newLocation) {
      this.pickedLocation = {
        lat: newLocation.lat(),
        lng: newLocation.lng()
      };

      this.$emit('centerUpdated', this.pickedLocation);
    }
  },

  watch: {
    pickedLocation(newValue, oldValue) {
      this.$emit('centerUpdated', this.pickedLocation);
    }
  },

  created() {
    this.$emit('centerUpdated', this.pickedLocation);
  }
};
</script>

<style lang="scss" scoped>
.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 100%;
  position: unset;
}
</style>

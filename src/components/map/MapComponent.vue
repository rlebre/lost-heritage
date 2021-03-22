<template>
  <googlemaps-map
    ref="map"
    class="map fit googlemaps-map"
    :center="{ lat: 39.7330017, lng: -7.6897566 }"
    :zoom="7"
    :options="{
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUI: false,
      styles: $q.dark.isActive ? styleDark : styleLight
    }"
    @click="closeInfoWindows"
  >
    <googlemaps-marker
      :key="`marker-${post._id}`"
      :ref="`marker-${post._id}`"
      v-for="post in posts"
      :position="{ lat: post.lat, lng: post.lng }"
      :clickable="true"
      :draggable="false"
      :icon="
        `http://maps.google.com/mapfiles/ms/icons/${
          post.isRecovered ? 'green' : 'red'
        }-dot.png`
      "
      @click="selectMarker(post)"
    >
    </googlemaps-marker>
  </googlemaps-map>
</template>

<script>
import { styleLight, styleDark } from '../../helpers/map-styles';
import PinInfoWindow from 'components/map/PinInfoWindow';
import Vue from 'vue';

export default {
  name: 'Map',

  props: {
    posts: {
      type: Array
    },

    focusOnPost: {
      type: Object
    }
  },

  components: {
    PinInfoWindow
  },

  data() {
    return {
      infoWindowList: [],
      styleLight,
      styleDark
    };
  },

  watch: {
    focusOnPost(newValue, oldValue) {
      this.selectMarker(newValue);
    }
  },

  methods: {
    selectMarker(post) {
      this.closeInfoWindows();
      const map = this.$refs.map.$_map;
      const marker_ele = this.$refs[`marker-${post._id}`][0].$_marker;

      const ComponentClass = Vue.extend(PinInfoWindow);
      const PinInfoWindowInstance = new ComponentClass({
        propsData: {
          post: post
        }
      });

      PinInfoWindowInstance.$mount();

      const infowindow = new google.maps.InfoWindow({
        content: PinInfoWindowInstance.$el
      });

      infowindow.open(map, marker_ele);

      this.infoWindowList.push(infowindow);
    },

    closeInfoWindows() {
      this.infoWindowList.forEach(infoWindow => infoWindow.close());
    }
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

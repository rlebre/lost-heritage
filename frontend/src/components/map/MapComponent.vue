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
      :key="`marker-${index}`"
      :ref="`marker-${index}`"
      v-for="(post, index) in posts"
      :position="{ lat: post.lat, lng: post.lng }"
      :clickable="true"
      :draggable="false"
      :icon="
        `http://maps.google.com/mapfiles/ms/icons/${
          post.isRecovered ? 'green' : 'red'
        }-dot.png`
      "
      @click="selectMarker(`marker-${index}`, post)"
    >
    </googlemaps-marker>
  </googlemaps-map>
</template>

<script>
import { styleLight, styleDark } from '../../helpers/map-styles';

export default {
  name: 'Map',

  props: {
    posts: {
      type: Array
    }
  },

  data() {
    return {
      infoWindowList: [],
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
    selectMarker(marker, post) {
      this.closeInfoWindows();
      var map = this.$refs.map.$_map;
      var marker_ele = this.$refs[marker][0].$_marker;
      var contentString = `\
        <img
          class="rounded-borders"
          src="${post.images[0]}"
          style="height:100px"
        />\
        <p><b>Title:</b> ${post.title}</p>\
        <p><b>Details:</b> ${post.details}</p>\
        `;

      var infowindow = new google.maps.InfoWindow({
        content: contentString
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

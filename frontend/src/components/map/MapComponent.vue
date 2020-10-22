<template>
  <GmapMap
    :center="{ lat: 39.7330017, lng: -7.6897566 }"
    :zoom="7"
    :options="{
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUI: false
    }"
    style="height:90%"
  >
    <GmapMarker
      :key="index"
      v-for="(post, index) in posts"
      :position="{ lat: post.lat, lng: post.lng }"
      :clickable="true"
      :draggable="false"
      @click="
        center = { lat: post.lat, lng: post.lng };
        post.clicked = !post.clicked;
      "
      :icon="
        `http://maps.google.com/mapfiles/ms/icons/${
          post.isRecovered ? 'green' : 'red'
        }-dot.png`
      "
    >
      <gmap-info-window :opened="post.clicked">
        <q-img class="col" style="width:200px" :src="post.imageUrls[0]" />
        <p><b>Title:</b> {{ post.title }}</p>
        <p><b>Details:</b> {{ post.details }}</p>
      </gmap-info-window>
    </GmapMarker>
  </GmapMap>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';

export default {
  name: 'Map',

  props: {
    posts: {
      type: Array,
      required: true
    }
  },

  data() {
    return {};
  },

  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D, HH:mm');
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

<template>
  <q-page class="q-pa-md">
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
      >
        <gmap-info-window :opened="post.clicked">
          <q-img class="col" style="width:200px" :src="post.imageUrls[0]" />
          <p><b>Title:</b> {{ post.title }}</p>
          <p><b>Details:</b> {{ post.details }}</p>
        </gmap-info-window>
      </GmapMarker>
    </GmapMap>
  </q-page>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';

export default {
  name: 'PageMap',
  data() {
    return {
      posts: []
    };
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D, HH:mm');
    }
  },
  created() {
    this.posts = this.$attrs.buildingList.map(obj => ({
      ...obj,
      clicked: false
    }));
    this.loadingPosts = this.$attrs.loadingBuildings;
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

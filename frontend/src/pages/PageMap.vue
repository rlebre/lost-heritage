<template>
  <q-page class="constrain-more q-pa-md">
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
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="
          center = m.position;
          m.ifw = !m.ifw;
        "
      >
        <gmap-info-window :opened="m.ifw">
          <b>Text:</b> {{ m.ifw2text }}
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
      markers: [
        {
          position: { lat: 10.0, lng: 10.0 },
          ifw2text: 'This text is bad please change me :( ',
          ifw: false
        },
        {
          position: { lat: 11.0, lng: 11.0 },
          ifw: false
        },
        {
          position: {
            lat: 48.8538302,
            lng: 2.2982161
          },
          opacity: 1,
          draggable: true,
          enabled: true,
          clicked: 0,
          rightClicked: 0,
          dragended: 0,
          ifw: false,
          ifw2text: 'This text is bad please change me :( '
        }
      ]
    };
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

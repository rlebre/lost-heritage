<template>
  <q-dialog v-model="showLocationPickerDialog">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header>
        <q-toolbar>
          <q-toolbar-title>
            <h6 class="text-h6 q-ma-sm">Pick Location on map</h6>
          </q-toolbar-title>
          <q-btn
            class="float-right"
            flat
            v-close-popup
            round
            dense
            icon="close"
          />
        </q-toolbar>
      </q-header>

      <q-footer class="flex flex-center">
        <q-btn
          class="q-ma-sm q-pa-md q-px-xl"
          flat
          @click="emitLocation()"
          dense
          icon="eva-checkmark-circle-2-outline"
          >Set</q-btn
        >
      </q-footer>

      <q-page-container>
        <q-page padding>
          <MapLocationPicker
            @centerUpdated="centerCoordinatesUpdated"
          ></MapLocationPicker>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
export default {
  name: 'LocationPickerDialog',

  data() {
    return {
      showLocationPickerDialog: true,
      currentCoordinates: Object
    };
  },

  methods: {
    centerCoordinatesUpdated(coordinates) {
      this.currentCoordinates = coordinates;
    },

    emitLocation() {
      this.$emit('pickedLocation', this.currentCoordinates);
      this.$emit('closed');
      this.showLocationPickerDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.body--dark {
  .page-container {
    background: $grey-9;
  }

  .q-header,
  .q-footer,
  .q-route-tab {
    background: $grey-10;
    color: $grey-13 !important;
  }
}
</style>

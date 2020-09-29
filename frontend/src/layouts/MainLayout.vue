<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <!-- <q-separator vertical spaced class="large-screen-only" /> -->

        <q-toolbar-title class="text-grand-hotel text-bold">
          {{ $t('header.appName') }}
        </q-toolbar-title>

        <q-btn
          flat
          round
          icon="eva-home-outline"
          size="18px"
          dense
          to="/"
          class="large-screen-only q-mr-lg"
        />

        <q-btn
          flat
          round
          icon="eva-map-outline"
          size="18px"
          dense
          to="/map"
          class="large-screen-only q-mr-lg"
        />

        <q-btn
          flat
          round
          icon="eva-camera-outline"
          size="18px"
          dense
          to="/camera"
          class="large-screen-only q-mr-lg"
        />

        <q-select
          class="text-uppercase text-weight-bold"
          v-model="lang"
          :options="langOptions"
          dense
          borderless
          emit-value
          map-options
          options-dense
        />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/map" icon="eva-map-outline" />
        <q-route-tab to="/camera" icon="eva-camera-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1" v-if="!loadingBuildings">
      <router-view
        :buildingList="buildingList"
        :loadingBuildings="loadingBuildings"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      buildingList: [],
      loadingBuildings: true,
      langOptions: [
        { value: 'en-us', label: 'EN' },
        { value: 'pt-pt', label: 'PT' }
      ],
      lang: 'EN'
    };
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
    }
  },
  methods: {
    getBuildings() {
      this.loadingBuildings = true;
      this.$axios
        .get(`${process.env.API}/posts`)
        .then(response => {
          this.buildingList = response.data;
          this.loadingBuildings = false;
        })
        .catch(error => {
          this.$q.dialog({
            title: 'Error',
            message: 'Could not download buildings.'
          });
          this.loadingBuildings = false;
        });
    }
  },
  created() {
    this.getBuildings();
  }
};
</script>

<style lang="scss">
.q-footer {
  .q-tab__icon {
    font-size: 30px;
  }
}

.q-toolbar {
  @media (min-width: $breakpoint-sm-min) {
    height: 77px;
  }
}

.q-toolbar__title {
  font-size: 30px;

  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}
</style>

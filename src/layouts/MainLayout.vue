<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-header" bordered>
      <q-toolbar class="constrain">
        <!-- <q-separator vertical spaced class="large-screen-only" /> -->

        <router-link class="no-link flex" to="/">
          <q-avatar class="q-my-auto large-screen-only">
            <img :src="$q.dark.isActive ? 'lost-heritage-reverse.png' : 'lost-heritage.png'" />
          </q-avatar>

          <q-avatar class="q-my-auto small-screen-only absolute-center">
            <img :src="$q.dark.isActive ? 'lost-heritage-reverse-full.png' : 'lost-heritage-full.png'" />
          </q-avatar>

          <q-toolbar-title class="large-screen-only text-grand-hotel text-bold toolbar-title">
            {{ $t('appName') }}
          </q-toolbar-title>
        </router-link>

        <div class="q-space"></div>

        <q-btn flat round icon="eva-home-outline" size="18px" dense to="/" class="large-screen-only q-mr-lg" />

        <q-btn flat round icon="eva-map-outline" size="18px" dense to="/map" class="large-screen-only q-mr-lg" />

        <q-btn
          flat
          round
          icon="eva-plus-circle-outline"
          size="18px"
          dense
          to="/new-post"
          class="large-screen-only q-mr-lg"
        />

        <q-btn flat round icon="eva-settings-2-outline" size="18px" dense @click="showSettingsDialog = true" />

        <Settings :show="showSettingsDialog" @onClose="settingsClosed" />
      </q-toolbar>
    </q-header>

    <q-footer class="small-screen-only q-footer" bordered>
      <q-tabs class="text-grey-10" active-color="primary" indicator-color="transparent">
        <q-route-tab to="/" icon="eva-home-outline" class="q-route-tab" />
        <q-route-tab to="/map" icon="eva-map-outline" class="q-route-tab" />
        <q-route-tab to="/new-post" icon="eva-plus-circle-outline" class="q-route-tab" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Settings from 'components/common/Settings';

export default {
  name: 'MainLayout',

  components: {
    Settings
  },

  data() {
    return {
      showSettingsDialog: false
    };
  },

  methods: {
    settingsClosed() {
      this.showSettingsDialog = false;
    }
  },

  meta() {
    return {
      title: this.$i18n.t('appName')
    };
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

.body--light {
  .page-container {
    background: $grey-1;
  }

  .q-header,
  .q-footer,
  .q-route-tab {
    background: white;
    color: $grey-10 !important;
  }

  .toolbar-title {
    color: $grey-10;
  }
}

.body--dark {
  .q-page-container {
    background: $grey-9;
  }

  .q-header,
  .q-footer,
  .q-route-tab {
    background: $grey-10;
    color: $grey-13;
  }

  .toolbar-title {
    color: $grey-13;
  }
}
</style>

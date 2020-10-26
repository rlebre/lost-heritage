<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      :class="
        $q.dark.isActive ? 'bg-grey-10 text-grey-13' : 'bg-white text-grey-10'
      "
      bordered
    >
      <q-toolbar class="constrain">
        <!-- <q-separator vertical spaced class="large-screen-only" /> -->

        <router-link class="no-link" to="/">
          <q-toolbar-title
            :class="
              'text-grand-hotel text-bold '.concat(
                $q.dark.isActive ? 'text-grey-13' : 'text-grey-10'
              )
            "
          >
            {{ $t('header.appName') }}
          </q-toolbar-title>
        </router-link>

        <div class="q-space"></div>

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
          icon="eva-plus-circle-outline"
          size="18px"
          dense
          to="/new-post"
          class="large-screen-only q-mr-lg"
        />

        <q-toggle
          v-model="$q.dark.isActive"
          @toggle="toggleDark"
          checked-icon="eva-moon-outline"
          unchecked-icon="eva-sun-outline"
          color="orange"
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

    <q-footer
      :class="
        'small-screen-only '.concat(
          $q.dark.isActive ? 'bg-grey-10 text-grey-13' : 'bg-white text-grey-10'
        )
      "
      bordered
    >
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/map" icon="eva-map-outline" />
        <q-route-tab to="/new-post" icon="eva-plus-circle-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MainLayout',

  data() {
    return {
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
    toggleDark() {
      this.$q.dark.toggle();
    }
  }
};
</script>

<style lang="scss">
.no-link {
  text-decoration: none;

  :visited,
  :hover,
  :active {
    color: inherit;
  }
}

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

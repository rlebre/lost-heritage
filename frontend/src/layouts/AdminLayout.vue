<template>
  <q-layout view="hHh Lpr lFf">
    <q-header
      :class="
        $q.dark.isActive ? 'bg-grey-10 text-grey-13' : 'bg-white text-grey-10'
      "
      bordered
    >
      <q-toolbar class="constrain">
        <!-- <q-separator vertical spaced class="large-screen-only" /> -->

        <q-btn flat @click="showDrawer = !showDrawer" round icon="menu" />

        <router-link class="no-link q-px-lg" to="/">
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
        <q-route-tab
          to="/"
          icon="eva-home-outline"
          :class="
            $q.dark.isActive
              ? 'bg-grey-10 text-grey-13'
              : 'bg-white text-grey-10'
          "
        />
        <q-route-tab
          to="/map"
          icon="eva-map-outline"
          :class="
            $q.dark.isActive
              ? 'bg-grey-10 text-grey-13'
              : 'bg-white text-grey-10'
          "
        />
        <q-route-tab
          to="/new-post"
          icon="eva-plus-circle-outline"
          :class="
            $q.dark.isActive
              ? 'bg-grey-10 text-grey-13'
              : 'bg-white text-grey-10'
          "
        />
      </q-tabs>
    </q-footer>

    <q-drawer v-model="showDrawer" show-if-above bordered>
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list>
          <q-item to="/admin" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="dashboard" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item
            to="/admin/approved-posts"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon name="eva-list" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Approved Posts</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            to="/admin/pending-posts"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon name="eva-email" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Pending Posts</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            to="/admin/declined-posts"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon name="eva-trash-2" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Declined Posts</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item
            to="/admin/pending-comments"
            disabled
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon name="eva-message-circle" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Pending Comments</q-item-label>
            </q-item-section>
          </q-item>
          <q-item disabled active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="eva-trash-2" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Declined Comments</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="q-ml-sm q-mb-sm text-weight-bolder" v-if="getUsername">
            {{ getUsername }}
          </div>
          <q-btn
            rounded
            color="primary"
            size="12px"
            label="Logout"
            @click="onLogout()"
          />
        </div>
      </q-img>
    </q-drawer>

    <q-page-container :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainLayout',

  data() {
    return {
      showDrawer: false,
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

  computed: {
    ...mapGetters('auth', ['getUsername'])
  },

  methods: {
    ...mapActions('auth', ['logout']),

    toggleDark() {
      this.$q.dark.toggle();
    },

    onLogout() {
      this.logout();
      this.$router.push('/login');
    }
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

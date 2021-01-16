<template>
  <q-layout view="hHh Lpr lFf">
    <q-header bordered>
      <q-toolbar class="constrain">
        <!-- <q-separator vertical spaced class="large-screen-only" /> -->

        <q-btn flat @click="showDrawer = !showDrawer" round icon="menu" />

        <router-link class="no-link q-px-lg" to="/">
          <q-toolbar-title class="text-grand-hotel text-bold ">
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

        <q-btn
          flat
          round
          icon="eva-settings-2-outline"
          size="18px"
          dense
          @click="showSettingsDialog = true"
        />

        <Settings :show="showSettingsDialog" @onClose="settingsClosed" />
      </q-toolbar>
    </q-header>

    <q-footer class="small-screen-only " bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" class="q-route-tab" />
        <q-route-tab to="/map" icon="eva-map-outline" class="q-route-tab" />
        <q-route-tab
          to="/new-post"
          icon="eva-plus-circle-outline"
          class="q-route-tab"
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

          <q-item disabled active-class="q-item-no-link-highlighting">
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
          <div class="flex flex-center">
            <q-btn
              rounded
              class="q-mx-sm"
              color="primary"
              size="12px"
              label="Profile"
              disabled
            />
            <q-btn
              rounded
              color="primary"
              class="q-mx-sm"
              size="12px"
              label="Logout"
              @click="onLogout()"
            />
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Settings from 'components/common/Settings';

export default {
  name: 'MainLayout',

  components: {
    Settings
  },

  data() {
    return {
      showDrawer: false,
      showSettingsDialog: false
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

    settingsClosed() {
      this.showSettingsDialog = false;
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

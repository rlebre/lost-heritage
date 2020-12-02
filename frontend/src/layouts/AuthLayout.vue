<template>
  <q-layout view="hHh Lpr fFf">
    <q-header
      bordered
      :class="
        $q.dark.isActive ? 'bg-grey-10 text-grey-13' : 'bg-white text-grey-10'
      "
    >
      <q-toolbar class="constrain">
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
      </q-toolbar>
    </q-header>

    <q-page-container :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AuthLayout',

  data() {
    return {};
  }
};
</script>

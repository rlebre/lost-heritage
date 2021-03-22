<template>
  <q-card flat>
    <q-card-section horizontal class="flex flex-center">
      <q-card-section class="q-pt-xs q-mt-sm">
        <div class="text-h6 text-weight-bold">
          {{ post.title }}
        </div>
        <div class="text-caption text-grey-7 small-screen-only">
          {{ post.details | str_limit(50) }}
        </div>
        <div class="text-caption text-grey-7 large-screen-only">
          {{ post.details | str_limit(100) }}
        </div>
      </q-card-section>

      <q-card-section class="flex flex-center large-screen-only">
        <q-img
          class="rounded-borders"
          :src="post.images[0]"
          style="height:100px; min-width:150px"
        />
      </q-card-section>
    </q-card-section>

    <div class="row q-mb-sm q-mx-md q-pb-xs">
      <div class="col-6">
        <div class="text-subtitle2">
          <q-icon name="eva-heart" color="negative" /> {{ post.likes }}
        </div>
      </div>

      <!-- <div class="col-6">
        <q-btn
          class="float-right"
          color="primary"
          icon="eva-arrow-circle-right"
          size="sm"
          unelevated
          label="Navigate"
        >
          <q-tooltip>Navigate to {{ post.title }}</q-tooltip>
        </q-btn>
      </div> -->
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'PinInfoWindow',

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.body--dark {
  .q-card {
    color: $grey-13;

    &-body {
      background: $grey-10;
    }
    &-title {
      color: $grey-13;
    }
  }

  .likes-counter {
    color: $grey-13;
  }
}
</style>

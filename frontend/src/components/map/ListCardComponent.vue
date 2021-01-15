<template>
  <q-card class="card-post q-mb-md" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col-7 q-mt-sm">
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

      <q-card-section class="col-5 flex flex-center">
        <q-img
          class="rounded-borders"
          :src="post.images[0]"
          style="height:100px"
        />
      </q-card-section>
    </q-card-section>

    <div class="row q-mb-sm q-mx-md q-pb-xs">
      <div class="col-6">
        <div class="text-subtitle2">
          <q-icon name="eva-heart" color="negative" /> {{ post.likes }}
        </div>
      </div>
      <div class="col-6">
        <q-btn
          class="q-mr-xs float-right"
          round
          color="primary"
          icon="eva-facebook-outline"
          size="xs"
          unelevated
        />

        <q-btn
          class="q-mr-xs float-right"
          round
          color="primary"
          icon="eva-twitter-outline"
          size="xs"
          unelevated
        />

        <q-btn
          class="q-mr-xs float-right"
          round
          color="primary"
          icon="eva-share-outline"
          size="xs"
          unelevated
        />
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'ListCardComponent',

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

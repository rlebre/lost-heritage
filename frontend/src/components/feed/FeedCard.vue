<template>
  <q-card class="card-post q-mb-md" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs q-pb-xs">
        <div class="text-h5 q-mt-sm text-weight-bold">
          {{ post.title }}
        </div>
      </q-card-section>
    </q-card-section>

    <div class="row q-mt-sm q-mx-md">
      <div class="col-6">
        <div class="text-subtitle2">
          <q-icon name="eva-heart" color="negative" /> 1000
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

    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col-7 q-mt-sm">
        <div class="text-caption text-grey-7 small-screen-only">
          {{ post.details | str_limit(200) }}
        </div>
        <div class="text-caption text-grey-7 large-screen-only">
          {{ post.details }}
        </div>
      </q-card-section>

      <q-card-section class="col-5 flex flex-center">
        <q-img
          class="rounded-borders"
          :src="post.imageUrls[0]"
          style="height:100px"
        />
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <div class="col-1 q-mr-sm">
        <q-btn
          class="q-ml-sm"
          round
          color="negative"
          icon="eva-heart"
          size="sm"
          unelevated
        />
      </div>
      <div class="col-10 q-ml-sm">
        <q-input
          outlined
          filled
          placeholder="Comment"
          dense
          autogrow
          v-model="newComment"
        >
          <template v-slot:after>
            <q-btn
              flat
              rounded
              color="primary large-screen-only"
              label="Add Comment"
            />
            <q-btn flat rounded color="primary small-screen-only" icon="send" />
          </template>
        </q-input>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'FeedCard',

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      newComment: ''
    };
  }
};
</script>

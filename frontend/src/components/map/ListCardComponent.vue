<template>
  <q-card class="card-post q-mb-md" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col-7 q-mt-sm">
        <div class="text-h6 text-weight-bold">
          <router-link class="no-link" :to="`/post/${post._id}`">
            {{ post.title }}
          </router-link>
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

    <div class="row q-mb-sm q-mx-md q-pb-xs flex flex-center">
      <div class="text-subtitle2 q-mx-sm">
        <q-icon name="eva-heart" color="negative" /> {{ post.likes }}
      </div>

      <q-btn
        class="q-mx-xl float-right "
        round
        color="primary"
        icon="eva-eye-outline"
        size="xs"
        unelevated
        @click="onViewOnMapClick"
      />

      <div class="flex" v-if="url && post">
        <q-btn
          class="q-mr-xs float-right"
          round
          color="primary"
          icon="eva-share-outline"
          size="xs"
          unelevated
          @click="copyToClipboardHandler"
        />

        <ShareNetwork
          network="twitter"
          :url="url"
          :title="`${post.title} - ${post.details}`"
          hashtags="PatrimonioEsquecido,LostHeritage"
        >
          <q-btn
            class="q-mr-xs float-right"
            round
            color="primary"
            icon="eva-twitter-outline"
            size="xs"
            unelevated
          />
        </ShareNetwork>

        <ShareNetwork
          network="facebook"
          :url="url"
          :title="post.title"
          :quote="post.details"
          hashtags="PatrimonioEsquecido,LostHeritage"
        >
          <q-btn
            class="q-mr-xs float-right"
            round
            color="primary"
            icon="eva-facebook-outline"
            size="xs"
            unelevated
          />
        </ShareNetwork>
      </div>
    </div>
  </q-card>
</template>

<script>
import { copyToClipboard } from 'quasar';

export default {
  name: 'ListCardComponent',

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      url: null,
      clipboardMessage: ''
    };
  },

  methods: {
    copyToClipboardHandler() {
      copyToClipboard(this.clipboardMessage)
        .then(() => {
          this.$q.notify({
            message: 'Copied to clipboard.',
            actions: [
              {
                icon: 'close',
                color: 'white'
              }
            ]
          });
        })
        .catch(() => {
          this.$q.notify({
            message: 'Failed.',
            actions: [
              {
                icon: 'close',
                color: 'white'
              }
            ]
          });
        });
    },

    onViewOnMapClick() {
      this.$emit('viewOnMap', this.post);
    }
  },

  mounted() {
    this.url = `${process.env.PRODUCTION_URL}/#/post/${this.post._id}`;
    this.clipboardMessage = `${this.post.title}\n${this.post.details}\n\n${this.url}`;
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

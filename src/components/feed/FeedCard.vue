<template>
  <q-card class="card-post q-mb-md" flat bordered>
    <q-card-section horizontal class="q-mx-md q-py-xs flex">
      <div class="text-h5 q-mt-sm text-weight-bold q-card-title">
        <router-link class="no-link" :to="`/post/${post._id}`">
          {{ post.title }}
        </router-link>
      </div>
    </q-card-section>

    <div class="q-mx-md text-capitalize q-card-county">
      {{ post.county }}
    </div>

    <div class="row q-mt-sm q-mx-md">
      <div class="col-6">
        <div class="text-subtitle2 likes-counter">
          <q-icon name="eva-heart" color="negative" /> {{ post.likes }}
        </div>
      </div>
      <div class="col-6" v-if="url && post">
        <q-btn
          class="q-mr-xs float-right"
          round
          color="primary"
          icon="eva-share-outline"
          size="xs"
          unelevated
          @click="copyToClipboardHandler"
        >
          <q-tooltip anchor="bottom middle" self="top middle">
            {{ $t('tooltips.copyClipboard') }}
          </q-tooltip>
        </q-btn>

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
          >
            <q-tooltip anchor="bottom middle" self="top middle">
              {{ $t('tooltips.shareTwitter') }}
            </q-tooltip>
          </q-btn>
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
          >
            <q-tooltip anchor="bottom middle" self="top middle">
              {{ $t('tooltips.shareFacebook') }}
            </q-tooltip>
          </q-btn>
        </ShareNetwork>
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
          :src="post.images[0]"
          style="height:100px"
        />
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions class="flex">
      <FeedCardActions :postId="post._id" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { copyToClipboard } from 'quasar';
import FeedCardActions from 'components/feed/FeedCardActions';

export default {
  name: 'FeedCard',

  components: {
    FeedCardActions
  },

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
            message: this.$t('notifications.copiedClipboard'),
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
            message: this.$t('notifications.failedCopying'),
            actions: [
              {
                icon: 'close',
                color: 'white'
              }
            ]
          });
        });
    }
  },

  mounted() {
    this.url = `${process.env.PRODUCTION_URL}/post/${this.post._id}`;
    this.clipboardMessage = `${this.post.title}\n${this.post.details}\n\n${this.url}`;
  }
};
</script>

<style lang="scss" scoped>
.body--dark {
  .q-card {
    &-body {
      background: $grey-10;
    }

    &-title,
    &-county {
      color: $grey-13;
    }
  }

  .likes-counter {
    color: $grey-13;
  }
}

.body--light {
  .q-card {
    &-county {
      color: $grey-8;
    }
  }
}
</style>

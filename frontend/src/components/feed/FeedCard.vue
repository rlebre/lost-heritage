<template>
  <q-card class="card-post q-mb-md " flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs q-pb-xs">
        <div class="text-h5 q-mt-sm text-weight-bold q-card-title">
          <router-link class="no-link" :to="`/post/${post._id}`">
            {{ post.title }}
          </router-link>
        </div>
      </q-card-section>
    </q-card-section>

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

    <q-card-actions>
      <div class="col-1 q-mr-sm">
        <q-btn
          class="q-ml-sm"
          round
          color="negative"
          icon="eva-heart"
          size="sm"
          unelevated
          @click="addLike"
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
              @click="addComment"
            />
            <q-btn
              flat
              rounded
              color="primary small-screen-only"
              icon="send"
              @click="addComment"
            />
          </template>
        </q-input>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { copyToClipboard } from 'quasar';
import { mapGetters, mapActions } from 'vuex';

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
      newComment: '',
      url: null,
      clipboardMessage: ''
    };
  },

  methods: {
    ...mapActions('posts', ['likePost', 'commentPost']),

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

    addLike() {
      this.likePost(this.post._id);
    },

    addComment() {
      this.newComment = '';

      this.commentPost({
        postId: this.post._id,
        comment: this.newComment
      });

      this.$q.notify({
        message: 'Comment created.',
        html: true,
        timeout: 5000,
        actions: [
          {
            icon: 'close',
            color: 'white'
          },
          {
            icon: 'eva-arrow-circle-right',
            color: 'white',
            handler: () => {
              this.$router.push(`/post/${this.post._id}`);
              this.$forceUpdate();
            }
          }
        ]
      });
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

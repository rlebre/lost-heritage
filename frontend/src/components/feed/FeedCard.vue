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
      <div class="q-px-sm full-width">
        <q-input
          outlined
          filled
          class="first-letter-uppercase"
          :placeholder="$t('c.card.comment')"
          dense
          autogrow
          v-model="newComment"
        >
          <template v-slot:before>
            <q-btn
              class="q-mr-md"
              :loading="isLikingPost()"
              round
              color="negative"
              icon="eva-heart"
              size="10px"
              unelevated
              @click="addLike"
            >
              <q-tooltip
                ref="tooltip"
                :hide-delay="500"
                no-parent-event
                anchor="center right"
                self="center left"
              >
                {{ `+${likesClicked}` }}
              </q-tooltip>
            </q-btn>
          </template>

          <template v-slot:after>
            <q-btn
              class="q-ml-md"
              color="primary"
              icon="send"
              :loading="isCommentingPost()"
              unelevated
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
      clipboardMessage: '',
      likesClicked: 0
    };
  },

  methods: {
    ...mapActions('posts', ['likePost', 'commentPost']),
    ...mapGetters('posts', ['isLikingPost', 'isCommentingPost']),

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
    },

    addLike() {
      this.likePost(this.post._id).then(
        data => {
          this.likesClicked++;
          this.$refs['tooltip'].show();
          setTimeout(this.$refs['tooltip'].hide, 3000);
        },
        errors => {
          this.$refs['tooltip'].show();
          setTimeout(this.$refs['tooltip'].hide, 3000);

          this.$q.notify({
            message: errors[0].title,
            caption: this.$t('notifications.maxLikes'),
            timeout: 3000
          });
        }
      );
    },

    addComment() {
      this.commentPost({
        postId: this.post._id,
        comment: this.newComment
      }).then(
        data => {
          this.newComment = '';

          this.$q.notify({
            message: this.$t('notifications.commentCreated'),
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
        },
        errors => {
          this.$q.notify({
            message: this.$t('notifications.errorComment'),
            caption: errors[0].title,
            timeout: 3000
          });
        }
      );
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

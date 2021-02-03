<template>
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
          :loading="isLikingPost"
          round
          color="negative"
          icon="eva-heart"
          size="10px"
          unelevated
          @click="addLike"
        >
          <q-tooltip
            ref="new-like-tooltip"
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
          :loading="isCommentingPost"
          unelevated
          @click="addComment"
        >
          <q-tooltip anchor="center left" self="center right">
            {{ $t('tooltips.sendComment') }}
          </q-tooltip>
        </q-btn>
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'FeedCardActions',

  props: {
    postId: String,
    required: true
  },

  data() {
    return {
      newComment: '',
      likesClicked: 0,
      isLikingPost: false,
      isCommentingPost: false
    };
  },

  methods: {
    ...mapActions('posts', ['likePost', 'commentPost']),

    addLike() {
      this.isLikingPost = true;

      this.likePost(this.postId).then(
        data => {
          this.isLikingPost = false;
          this.likesClicked++;
          this.$refs['new-like-tooltip'].show();
          setTimeout(this.$refs['new-like-tooltip'].hide, 3000);
        },
        errors => {
          this.isLikingPost = false;
          this.$refs['new-like-tooltip'].show();
          setTimeout(this.$refs['new-like-tooltip'].hide, 3000);

          this.$q.notify({
            message: errors[0].title,
            caption: this.$t('notifications.maxLikes'),
            timeout: 3000
          });
        }
      );
    },

    addComment() {
      this.isCommentingPost = true;

      this.commentPost({
        postId: this.postId,
        comment: this.newComment
      }).then(
        data => {
          this.isCommentingPost = false;
          this.newComment = '';

          this.$q.notify({
            message: this.$t('notifications.commentCreated'),
            timeout: 5000,
            actions: [
              {
                icon: 'close',
                color: 'white'
              },
              {
                icon: 'eva-arrow-circle-right',
                label: 'Ver',
                color: 'white',
                handler: () => {
                  this.$router.push(`/post/${this.postId}`);
                  this.$forceUpdate();
                }
              }
            ]
          });
        },
        errors => {
          this.isCommentingPost = false;
          this.$q.notify({
            message: this.$t('notifications.errorComment'),
            caption: errors[0].title,
            timeout: 3000
          });
        }
      );
    }
  }
};
</script>

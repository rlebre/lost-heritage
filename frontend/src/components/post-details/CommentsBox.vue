<template>
  <div>
    <q-input
      v-model="newComment"
      filled
      autogrow
      dense
      :input-style="{ 'font-size': '14px' }"
      class="col-12"
      label="Create new comment"
      type="textarea"
    />

    <q-btn
      v-if="newComment"
      unelevated
      color="primary"
      label="Submit"
      class="q-mt-xs"
      @click="addComment"
    ></q-btn>

    <template v-if="comments && comments.length > 0">
      <div class="col-12 q-mt-lg" v-for="comment in comments" :key="comment.id">
        <q-card class="card-post q-mb-md " flat bordered>
          <div class="row">
            <q-card-section class="col-8">
              <div class="text-caption text-grey-7 small-screen-only">
                {{ comment.comment | str_limit(200) }}
              </div>
              <div class="text-caption text-grey-7 large-screen-only">
                {{ comment.comment }}
              </div>
            </q-card-section>

            <div class="col-4">
              <div class="row">
                <q-card-section class="col-6 text-right">
                  <div class="text-caption text-grey-7 comment-date">
                    {{ comment.createdAt | commentDate }}
                  </div>
                </q-card-section>

                <q-card-section
                  class="col-6 text-right text-caption text-grey-7 comment-date"
                >
                  {{ comment.likes }}

                  <q-btn
                    round
                    :disabled="!comment._id"
                    class="q-ml-xs"
                    color="negative"
                    icon="eva-heart"
                    size="8px"
                    unelevated
                    @click="addLike(comment._id)"
                  />
                </q-card-section>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="col-12">
          <h5 class="text-center text-grey">No comments yet.</h5>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CommentsBox',

  props: {
    comments: {
      type: Array
    },
    postId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      newComment: ''
    };
  },

  methods: {
    ...mapActions('posts', ['commentPost']),

    ...mapActions('comments', ['likeComment']),

    addLike(commentId) {
      this.likeComment(commentId);
      this.comments[this.comments.findIndex(comm => comm._id === commentId)]
        .likes++;
    },

    addComment() {
      this.commentPost({
        postId: this.postId,
        comment: this.newComment
      });

      this.comments.unshift({
        comment: this.newComment,
        createdAt: Date.now(),
        likes: 0
      });

      this.newComment = null;

      this.$q.notify({
        message: '<p style="text-align:center">Comment created.<p>',
        html: true,
        timeout: 5000,
        actions: [
          {
            icon: 'close',
            color: 'white'
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-date {
  font-size: 11px;
}

.body--dark {
  color: $grey-13;

  .q-card {
    background: $grey-10;
  }
}
</style>

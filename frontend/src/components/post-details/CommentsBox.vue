<template>
  <div>
    <q-input
      v-model="newComment"
      filled
      autogrow
      dense
      :input-style="{ 'font-size': '14px' }"
      class="col-12"
      :label="$t('c.commentBox.createComment')"
      type="textarea"
    >
      <template v-slot:after>
        <q-btn
          v-if="newComment"
          unelevated
          class="q-ml-md text-uppercase"
          color="primary"
          icon="send"
          :label="$t('c.commentBox.submit')"
          @click="addComment"
        ></q-btn>
      </template>
    </q-input>

    <template v-if="comments && comments.length > 0">
      <div class="col-12 q-mt-lg" v-for="comment in comments" :key="comment.id">
        <CommentCard :comment="comment"></CommentCard>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="col-12">
          <h5 class="text-center text-grey">
            {{ $t('c.commentBox.noComments') }}
          </h5>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CommentCard from 'components/post-details/CommentCard';

export default {
  name: 'CommentsBox',

  components: {
    CommentCard
  },

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

    addComment() {
      this.commentPost({
        postId: this.postId,
        comment: this.newComment
      }).then(
        data => {
          this.comments.unshift({
            comment: this.newComment,
            createdAt: Date.now(),
            likes: 0
          });

          this.$q.notify({
            message: this.$t('notifications.commentCreated'),
            html: true,
            timeout: 5000,
            actions: [
              {
                icon: 'close',
                color: 'white'
              }
            ]
          });

          this.newComment = '';
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
  }
};
</script>

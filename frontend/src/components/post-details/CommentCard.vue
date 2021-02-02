<template>
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

          <q-card-section class="col-6 text-right text-caption text-grey-7">
            {{ likes }}

            <q-btn
              round
              :disabled="!comment._id"
              class="q-ml-xs"
              :loading="isLiking"
              color="negative"
              icon="eva-heart"
              size="8px"
              unelevated
              @click="addLike(comment._id)"
            >
              <q-tooltip
                ref="feedback-likes"
                :hide-delay="500"
                no-parent-event
                anchor="center right"
                self="center left"
              >
                {{ `+${nClickedLikes}` }}
              </q-tooltip>
            </q-btn>
          </q-card-section>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CommentCard',

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      likes: this.comment.likes,
      nClickedLikes: 0,
      isLiking: false
    };
  },

  methods: {
    ...mapActions('comments', ['likeComment']),

    addLike(commentId) {
      this.isLiking = true;

      this.likeComment(commentId).then(
        data => {
          this.isLiking = false;

          this.likes++;
          this.nClickedLikes++;
          this.$refs['feedback-likes'].show();
          setTimeout(this.$refs['feedback-likes'].hide, 3000);
        },
        errors => {
          this.isLiking = false;
          this.$refs['feedback-likes'].show();
          setTimeout(this.$refs['feedback-likes'].hide, 3000);

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

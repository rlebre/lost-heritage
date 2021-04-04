<template>
  <q-card flat>
    <q-card-section class="flex flex-center">
      <div class="text-h6 text-weight-bold q-mb-sm">
        {{ post.title }}
      </div>
      <q-img class="rounded-borders large-screen-only" :src="post.images[0]" :ratio="1">
        <div class="absolute-bottom text-subtitle1 text-center">
          {{ post.details | str_limit(70) }}
        </div>
      </q-img>

      <div class="text-caption text-grey-7 small-screen-only">
        {{ post.details | str_limit(50) }}
      </div>

      <q-img
        class="rounded-borders small-screen-only"
        :src="post.images[0]"
        :ratio="4 / 3"
        style="max-width: 150px"
      />
    </q-card-section>

    <div class="flex q-mb-sm q-mx-md q-pb-xs">
      <q-btn
        round
        class="q-mr-md q-my-xs"
        color="negative"
        icon="eva-heart"
        size="7px"
        @click="addLike(post._id)"
        :loading="isLikingPost"
        unelevated
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

      <div class="text-subtitle2 q-mt-xs">
        <q-icon name="eva-heart" color="negative" /> {{ post.likes }}
      </div>

      <q-space />

      <q-btn
        class=""
        color="primary"
        icon="eva-arrow-circle-right"
        size="sm"
        unelevated
        label="Navigate"
        :to="`post/${post._id}`"
      >
        <q-tooltip>Navigate to {{ post.title }}</q-tooltip>
      </q-btn>
    </div>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PinInfoWindow',

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      likesClicked: 0,
      isLikingPost: false
    };
  },

  methods: {
    ...mapActions('posts', ['likePost']),

    addLike(postId) {
      this.isLikingPost = true;

      this.likePost(postId).then(
        (data) => {
          this.isLikingPost = false;
          this.likesClicked++;
          this.$refs['new-like-tooltip'].show();
          setTimeout(this.$refs['new-like-tooltip'].hide, 1000);
        },
        (errors) => {
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
    }
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

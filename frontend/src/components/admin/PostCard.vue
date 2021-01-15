<template>
  <q-card
    :class="'card-post q-mb-md '.concat($q.dark.isActive ? 'bg-grey-10' : '')"
    flat
    bordered
  >
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col-7 q-mt-sm">
        <div class="text-h6 text-weight-bold q-mb-sm">
          {{ post.title }}
        </div>

        <div class="text-caption text-grey-7 q-mb-sm">
          {{ post.details | str_limit(150) }}
        </div>

        <div class="text-caption text-grey-7 q-mb-sm">
          {{ post.county | str_limit(50) }}
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

    <div class="row q-mx-md">
      <div class="center-buttons">
        <q-btn
          round
          flat
          size="18px"
          color="primary"
          icon="eva-search"
          :to="`post/${post._id}`"
        >
          <q-tooltip>Preview post</q-tooltip>
        </q-btn>

        <q-btn
          size="18px"
          round
          flat
          color="warning"
          icon="eva-edit"
          :to="`post/${post._id}/edit`"
        >
          <q-tooltip>Edit post</q-tooltip>
        </q-btn>

        <q-btn
          round
          flat
          size="18px"
          color="negative"
          icon="eva-close-circle"
          @click="onDeclinePostClick()"
        >
          <q-tooltip>Decline post</q-tooltip>
        </q-btn>

        <q-btn
          round
          flat
          size="18px"
          color="green"
          icon="eva-checkmark-circle-2"
          @click="onApprovePostClick()"
        >
          <q-tooltip>Approve post</q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'PostCard',

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data() {
    return {};
  },

  methods: {
    onApprovePostClick() {
      this.$emit('approvePost', this.post);
    },

    onDeclinePostClick() {
      this.$emit('declinePost', this.post);
    }
  }
};
</script>

<style lang="scss" scoped>
.center-buttons {
  margin: 0 auto;
}
</style>

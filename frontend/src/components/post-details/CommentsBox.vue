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
      @click="addPost"
    ></q-btn>

    <template v-if="comments && comments.length > 0">
      <div class="col-12 q-mt-lg" v-for="comment in comments" :key="comment.id">
        <q-card
          :class="
            'card-post q-mb-md '.concat($q.dark.isActive ? 'bg-grey-10' : '')
          "
          flat
          bordered
        >
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
                    class="q-ml-xs"
                    color="negative"
                    icon="eva-heart"
                    size="8px"
                    unelevated
                    @click="addLike"
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
export default {
  name: 'CommentsBox',

  props: {
    comments: {
      type: Array
    }
  },

  data() {
    return {
      newComment: ''
    };
  },

  methods: {
    addLike() {},

    addPost() {}
  }
};
</script>

<style lang="scss" scoped>
.comment-date {
  font-size: 11px;
}
</style>

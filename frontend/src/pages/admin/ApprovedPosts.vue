<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <ApprovedPostsTable
          :posts="posts"
          @removePost="onRemovePostClick"
        ></ApprovedPostsTable>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageAdmin',

  data() {
    return {
      posts: []
    };
  },

  methods: {
    ...mapActions('posts', ['fetchApprovedPosts', 'declinePost']),

    onRemovePostClick(post) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: `Would you like to <b class='text-negative'>decline</b> the post "${post.title}"?`,
          cancel: true,
          html: true
        })
        .onOk(() => {
          this.doDecline(post);
        });
    },

    doDecline(post) {
      this.declinePost(post._id).then(
        data => {
          this.$q.notify({
            message: 'Post declined successfully.',
            timeout: 5000
          });
        },
        errors => {
          this.$q.notify({
            message: errors[0].title,
            caption: errors[0].detail,
            timeout: 5000
          });
        }
      );
    }
  },

  computed: {
    ...mapGetters('posts', ['approvedPostsList'])
  },

  watch: {
    approvedPostsList(newValue, oldValue) {
      this.posts = newValue;
    }
  },

  mounted() {
    this.fetchApprovedPosts();
  }
};
</script>

<style lang="scss" scoped></style>

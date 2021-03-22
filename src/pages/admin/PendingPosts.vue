<template>
  <q-page class="q-pa-md">
    <div class="large-screen-only">
      <div class="row q-col-gutter-lg">
        <div class="col-12">
          <PendingPostsTable
            :posts="posts"
            @approvePost="onApprovePostClick"
            @declinePost="onDeclinePostClick"
          ></PendingPostsTable>
        </div>
      </div>
    </div>

    <div class="small-screen-only">
      <div
        class="list-panel col-sm-4 col-md-4"
        v-if="posts && posts.length > 0"
      >
        <template v-if="posts.length">
          <div
            class="col-12 q-ml-md q-mr-sm q-mb-sm"
            v-for="post in posts"
            :key="post.id"
          >
            <PostCard
              :post="post"
              @approvePost="onApprovePostClick"
              @declinePost="onDeclinePostClick"
            ></PostCard>
          </div>
        </template>
      </div>

      <div class="col-12" v-else>
        <h5 class="text-center text-grey">No pending posts.</h5>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PostCard from 'components/admin/PostCard';
import PendingPostsTable from 'components/admin/PendingPostsTable';

export default {
  name: 'PageAdmin',

  components: {
    PostCard,
    PendingPostsTable
  },

  data() {
    return {
      posts: []
    };
  },

  methods: {
    ...mapActions('posts', ['fetchPendingPosts', 'approvePost', 'declinePost']),

    onApprovePostClick(post) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: `Would you like to <b class='text-positive'>approve</b> the post "${post.title}"?`,
          cancel: true,
          html: true
        })
        .onOk(() => {
          this.doApprove(post);
        });
    },

    onDeclinePostClick(post) {
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

    doApprove(post) {
      this.approvePost(post._id).then(
        data => {
          this.$q.notify({
            message: 'Post approved successfully.',
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
    ...mapGetters('posts', ['pendingPostsList'])
  },

  watch: {
    pendingPostsList(newValue, oldValue) {
      this.posts = newValue;
    }
  },

  mounted() {
    this.fetchPendingPosts();
  }
};
</script>

<style lang="scss" scoped></style>

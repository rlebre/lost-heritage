<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <DeclinedPostsTable
          :posts="posts"
          @approvePost="onApprovePostClick"
        ></DeclinedPostsTable>
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
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        {
          name: 'preview',
          label: 'Preview',
          field: '',
          align: 'center',
          style: 'max-width: 1%; white-space: initial'
        },
        {
          name: 'title',
          label: 'Title',
          field: 'title',
          align: 'left',
          sortable: true,
          style: 'max-width: 10%; white-space: initial'
        },
        {
          name: 'details',
          label: 'Details',
          field: 'details',
          sortable: true,
          align: 'left',
          style: 'max-width: 20%; white-space: initial'
        },
        {
          name: 'county',
          label: 'County',
          field: 'county',
          align: 'left',
          sortable: true,
          style: 'max-width: 60%; white-space: initial'
        },
        {
          name: 'declinedBy',
          label: 'Declined By',
          field: 'declinedBy',
          align: 'left',
          sortable: true,
          style: 'max-width: 60%; white-space: initial'
        },
        {
          name: 'declinedAt',
          label: 'Declined At',
          field: 'declinedAt',
          align: 'left',
          sortable: true,
          style: 'max-width: 60%; white-space: initial'
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      posts: []
    };
  },

  methods: {
    ...mapActions('posts', [
      'fetchDeclinedPosts',
      'approvePost',
      'declinePost'
    ]),

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
    ...mapGetters('posts', ['declinedPostsList'])
  },

  watch: {
    declinedPostsList(newValue, oldValue) {
      this.posts = newValue;
    }
  },

  mounted() {
    this.fetchDeclinedPosts();
  }
};
</script>

<style lang="scss" scoped></style>

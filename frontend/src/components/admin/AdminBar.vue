<template>
  <div class="q-mb-lg admin-banner bg-grey-2 rounded-borders">
    <q-btn
      size="18px"
      round
      flat
      color="primary"
      icon="eva-arrow-circle-left"
      @click="$router.go(-1)"
    >
      <q-tooltip>Return</q-tooltip>
    </q-btn>

    <div class="q-space"></div>

    <q-toggle
      size="52px"
      round
      flat
      dense
      color="warning"
      icon="eva-edit"
      v-model="editableOn"
      keep-color
      @input="toggleEdit"
    >
      <q-tooltip>Edit post</q-tooltip>
    </q-toggle>

    <q-btn
      size="18px"
      dense
      round
      flat
      color="negative"
      icon="eva-close-circle"
      @click="onDeclinePostClick"
    >
      <q-tooltip>Decline post</q-tooltip>
    </q-btn>

    <q-btn
      size="18px"
      dense
      round
      flat
      color="green"
      icon="eva-checkmark-circle-2"
      @click="onApprovePostClick"
    >
      <q-tooltip>Approve post</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AdminBar',

  props: {
    editModeOn: {
      type: Boolean,
      default: false
    },

    post: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      editableOn: this.editModeOn
    };
  },

  methods: {
    ...mapActions('posts', ['approvePost', 'declinePost']),

    toggleEdit() {
      this.$emit('editModeChanged', this.editableOn);
    },

    onApprovePostClick() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: `Would you like to <b class='text-positive'>approve</b> the post "${this.post.title}"?`,
          cancel: true,
          html: true
        })
        .onOk(() => {
          this.doApprove();
        });
    },

    onDeclinePostClick() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: `Would you like to <b class='text-negative'>decline</b> the post "${this.post.title}"?`,
          cancel: true,
          html: true
        })
        .onOk(() => {
          this.doDecline();
        });
    },

    doApprove() {
      this.approvePost(this.post._id).then(
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

    doDecline() {
      this.declinePost(this.post._id).then(
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
  }
};
</script>

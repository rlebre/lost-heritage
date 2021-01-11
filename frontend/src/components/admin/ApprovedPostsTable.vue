<template v-if="posts">
  <q-table
    :data="posts"
    :columns="columns"
    row-key="index"
    :pagination.sync="pagination"
    no-data-label="No posts yet."
  >
    <template v-slot:body-cell-preview="props">
      <q-td :props="props">
        <q-btn
          dense
          round
          flat
          color="primary"
          icon="eva-search"
          :to="`post/${props.row._id}`"
        >
          <q-tooltip>Preview post</q-tooltip>
        </q-btn>
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense round flat color="warning" icon="eva-edit" disabled>
          <q-tooltip>Edit post</q-tooltip>
        </q-btn>

        <q-btn
          dense
          round
          flat
          color="negative"
          icon="eva-close-circle"
          @click="onRemovePostClick(props.row)"
        >
          <q-tooltip>Remove post</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'ApprovedPostsTable',

  props: {
    posts: {
      type: Array,
      required: true
    }
  },

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
          name: 'approvedBy',
          label: 'Approved By',
          field: 'approvedBy',
          align: 'left',
          sortable: true,
          style: 'max-width: 60%; white-space: initial'
        },
        {
          name: 'approvedAt',
          label: 'Published At',
          field: 'approvedAt',
          align: 'left',
          sortable: true,
          style: 'max-width: 60%; white-space: initial'
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ]
    };
  },

  methods: {
    onRemovePostClick(post) {
      this.$emit('removePost', post);
    }
  }
};
</script>

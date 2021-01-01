<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <template v-if="posts">
          <q-table
            :data="posts"
            :columns="columns"
            row-key="index"
            :pagination.sync="pagination"
          >
            <template v-slot:body-cell-preview="props">
              <q-td :props="props">
                <router-link class="no-link" :to="`/post/${props.row._id}`">
                  <q-btn dense round flat color="primary" icon="eva-search">
                    <q-tooltip>Preview post</q-tooltip>
                  </q-btn>
                </router-link>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  color="warning"
                  icon="eva-edit"
                  disabled
                >
                  <q-tooltip>Edit post</q-tooltip>
                </q-btn>

                <q-btn
                  dense
                  round
                  flat
                  color="negative"
                  icon="eva-close-circle"
                >
                  <q-tooltip>Decline post</q-tooltip>
                </q-btn>

                <q-btn
                  dense
                  round
                  flat
                  color="green"
                  icon="eva-checkmark-circle-2"
                  @click="insertTestData(props)"
                >
                  <q-tooltip>Approve post</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import testData from 'assets/test-data.json';

export default {
  name: 'PageAdmin',

  data() {
    return {
      pagination: {
        rowsPerPage: 8
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
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      posts: []
    };
  },

  methods: {
    ...mapActions('posts', ['fetchPendingPosts']),

    insertTestData(props) {
      //this.createPost(props.row);
      console.log('insert data clicked');
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
    console.log('aaaa');
    this.fetchPendingPosts();
  }
};
</script>

<style lang="scss" scoped></style>

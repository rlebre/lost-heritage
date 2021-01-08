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
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  color="grey"
                  icon="edit"
                  disabled
                ></q-btn>

                <q-btn
                  dense
                  round
                  flat
                  color="grey"
                  icon="delete"
                  disabled
                ></q-btn>

                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="send"
                  @click="insertTestData(props)"
                />
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

export default {
  name: 'PageAdmin',

  data() {
    return {
      pagination: {
        rowsPerPage: 8
      },
      columns: [
        {
          name: 'contributorName',
          label: 'Contributor',
          field: 'contributorName',
          sortable: true,
          align: 'left'
        },
        {
          name: 'title',
          label: 'Title',
          field: 'title',
          align: 'left',
          sortable: true
        },
        {
          name: 'county',
          label: 'County',
          field: 'county',
          align: 'left',
          sortable: true
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      posts: []
    };
  },

  methods: {
    ...mapActions('posts', ['createPost']),

    insertTestData(props) {
      this.createPost(props.row);
    }
  }
};
</script>

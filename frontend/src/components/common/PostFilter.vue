<template>
  <div class=" q-col-gutter-lg">
    <div class="small-screen-only ">My component</div>

    <div class="large-screen-only q-mt-sm q-pt-sm ">
      <div class="row">
        <div class="col-md-4 q-pr-sm">
          <q-select
            filled
            dense
            use-chips
            v-model="selectedOptions"
            multiple
            use-input
            options-dense
            clearable
            :options="existingCountiesList | capitalize_array"
            @filter="filterConcelhos"
            max-values="5"
            label="Concelhos"
            style="width: 100%"
            @input="filterChanged"
          />
          <!-- counter
            hint="Max 5 selections" -->
        </div>

        <div class="col-md-3 ">
          <q-select
            dense
            filled
            bottom-slots
            v-model="sortBy"
            :options="optionsSort"
            label="sort"
            style="width: 90%"
            @input="filterChanged"
          />
        </div>

        <div class="col-md-1">
          <q-btn
            class="q-mt-xs primary"
            dense
            unelevated
            size="md"
            :icon="sortDesc ? 'eva-arrow-up' : 'eva-arrow-down'"
            @click="toggleSort"
          />
        </div>

        <div class="col-md-4">
          <q-input
            class="col col-sm-10 float-right"
            v-model="search"
            filled
            dense
            clearable
            style="width:100%"
            label="Search"
            @input="filterChanged"
            debounce="1000"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PostFilter',

  data() {
    return {
      selectedOptions: [],
      optionsConcelhos: [],
      optionsConcelhosFiltered: [],
      optionsSort: ['Concelho', 'Data', 'Likes'],
      search: '',
      sortBy: 'Data',
      sortDesc: true
    };
  },

  computed: {
    ...mapGetters('infos', ['existingCountiesList'])
  },

  methods: {
    ...mapActions('infos', ['fetchExistingCounties']),

    toggleSort() {
      this.sortDesc ^= true;
      this.filterChanged();
    },

    filterConcelhos(val, update) {
      if (val === '') {
        update(() => {
          this.optionsConcelhosFiltered = this.optionsConcelhos;
        });
        return;
      }

      if (val.length < 2) {
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.optionsConcelhosFiltered = this.optionsConcelhos.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    filterChanged() {
      this.$emit('onFilterChanged', {
        selectedOptions: this.selectedOptions ? this.selectedOptions : [],
        sortBy: this.sortBy,
        sortType: this.sortDesc ? 'desc' : 'asc',
        searchString: this.search ? this.search : ''
      });
    }
  },

  created() {
    let concelhosDictionary = require('assets/concelhos.json');
    this.optionsConcelhos = Object.keys(concelhosDictionary);
    this.optionsConcelhosFiltered = this.optionsConcelhos;

    this.fetchExistingCounties();
  }
};
</script>

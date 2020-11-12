<template>
  <div class=" q-col-gutter-lg">
    <div class="small-screen-only q-pt-sm">
      <div class="col-12 ">
        <q-btn
          class="full-width q-my-sm"
          v-if="!showFilterModal"
          flat
          dense
          @click="showFilterModal = true"
          icon="eva-funnel-outline"
          >Filters</q-btn
        >
      </div>
      <q-dialog v-if="showFilterModal" v-model="showFilterModal">
        <q-layout view="Lhh lpR fff" container class="bg-white">
          <q-header
            :class="
              $q.dark.isActive
                ? 'bg-grey-9 text-grey-13'
                : 'bg-grey-1 text-grey-10'
            "
          >
            <q-toolbar>
              <q-toolbar-title>
                <h6 class="text-h6 q-ma-sm">Apply filters</h6>
              </q-toolbar-title>
              <q-btn
                class="float-right"
                flat
                v-close-popup
                round
                dense
                icon="close"
              />
            </q-toolbar>
          </q-header>

          <q-footer
            :class="
              'align-center col-12 '.concat(
                $q.dark.isActive
                  ? 'bg-grey-9 text-grey-13'
                  : 'bg-grey-1 text-grey-10'
              )
            "
          >
            <q-btn
              class="col-6 q-pa-md q-px-xl"
              flat
              @click="showFilterModal = false"
              dense
              icon="eva-checkmark-circle-2-outline"
              >Apply</q-btn
            >
            <q-btn
              class="col-6 q-pa-md q-px-xl float-right"
              flat
              dense
              @click="resetModalFilter"
              icon="eva-close-circle-outline"
              >Reset</q-btn
            >
          </q-footer>

          <q-page-container>
            <q-page padding>
              <div class="col-12 q-pa-md">
                <q-select
                  filled
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
                  counter
                  hint="Max 5 selections"
                />
              </div>

              <div class="col-12 q-pa-md">
                <q-select
                  filled
                  bottom-slots
                  v-model="sortBy"
                  :options="optionsSort"
                  label="Sort"
                  style="width: 90%"
                  @input="filterChanged"
                />
              </div>

              <div class="col-12 q-px-md">
                <span class="q-ml-sm">Sort</span>
                <q-btn
                  class="q-mt-xs primary"
                  unelevated
                  size="md"
                  :icon="sortDesc ? 'eva-arrow-down' : 'eva-arrow-up'"
                  @click="toggleSort"
                />
              </div>

              <div class="col-12 q-pa-md">
                <q-input
                  class="col col-sm-10 float-right"
                  v-model="search"
                  filled
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
            </q-page>
          </q-page-container>
        </q-layout>
      </q-dialog>
    </div>

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
            label="Sort"
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
            :icon="sortDesc ? 'eva-arrow-down' : 'eva-arrow-up'"
            @click="toggleSort"
          />
        </div>

        <div class="col">
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
      sortDesc: true,

      sortTranslation: {
        Data: 'date',
        Concelho: 'county',
        Likes: 'likes'
      },

      showFilterModal: false
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
        selectedOptions: this.selectedOptions
          ? this.lowerCaseArray(this.selectedOptions)
          : [],
        sortBy: this.sortTranslation[this.sortBy],
        sortType: this.sortDesc ? 'desc' : 'asc',
        searchString: this.search ? this.search : null
      });
    },

    lowerCaseArray(stringList) {
      return stringList.map(word => word.toLowerCase());
    },

    resetModalFilter() {
      this.selectedOptions = [];
      this.sortBy = 'Data';
      this.sortDesc = true;
      this.search = null;
      this.filterChanged();
      this.showFilterModal = false;
    }
  },

  created() {
    this.fetchExistingCounties();
  }
};
</script>

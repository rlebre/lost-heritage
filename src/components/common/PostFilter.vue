<template>
  <div class="q-col-gutter-lg">
    <div class="small-screen-only">
      <div class="col-12">
        <q-btn
          class="full-width q-mb-sm text-capitalize"
          flat
          dense
          @click="showFilterModal = true"
          icon="eva-funnel-outline"
        >
          {{ $t('c.filter.filters') }}
        </q-btn>
      </div>
      <q-dialog v-if="showFilterModal" v-model="showFilterModal">
        <q-layout view="Lhh lpR fff" container class="bg-white">
          <q-header>
            <q-toolbar>
              <q-toolbar-title>
                <h6 class="text-h6 q-ma-sm text-capitalize">
                  {{ $t('c.filter.applyFilters') }}
                </h6>
              </q-toolbar-title>
              <q-btn class="float-right" flat v-close-popup round dense icon="close" />
            </q-toolbar>
          </q-header>

          <q-footer class="flex flex-center">
            <q-btn
              class="q-pa-md q-px-xl text-capitalize"
              flat
              @click="showFilterModal = false"
              dense
              icon="eva-checkmark-circle-2-outline"
              >{{ $t('c.filter.apply') }}</q-btn
            >
            <q-btn
              class="q-pa-md q-px-xl float-right text-capitalize"
              flat
              dense
              @click="resetModalFilter"
              icon="eva-close-circle-outline"
              >{{ $t('c.filter.reset') }}</q-btn
            >
          </q-footer>

          <q-page-container>
            <q-page padding>
              <div class="col-12 q-pa-md">
                <q-select
                  :color="inputLabelColor"
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
                  :label="$t('c.filter.counties')"
                  class="text-capitalize"
                  style="width: 100%"
                  @input="filterChanged"
                  counter
                  :hint="$t('c.filter.countyHint')"
                />
              </div>

              <div class="col-12 q-pa-md">
                <q-select
                  :color="inputLabelColor"
                  filled
                  bottom-slots
                  v-model="sortBy"
                  :options="optionsSort"
                  :label="$t('c.filter.sort')"
                  style="width: 90%"
                  @input="filterChanged"
                />
              </div>

              <div class="col-12 q-px-md">
                <span class="q-ml-sm text-capitalize">
                  {{ $t('c.filter.sort') }}
                </span>
                <q-btn
                  color="grey-9"
                  class="q-mt-xs primary q-btn-sort"
                  unelevated
                  size="md"
                  :icon="sortDesc ? 'eva-arrow-down' : 'eva-arrow-up'"
                  @click="toggleSort"
                />
              </div>

              <div class="col-12 q-pa-md">
                <q-input
                  :color="inputLabelColor"
                  class="col col-sm-10 float-right text-capitalize"
                  v-model="search"
                  filled
                  clearable
                  style="width: 100%"
                  :label="$t('c.filter.search')"
                  @input="filterChanged"
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

    <div class="large-screen-only">
      <div class="flex">
        <div class="q-pr-sm">
          <q-select
            :color="inputLabelColor"
            filled
            dense
            use-chips
            v-model="selectedOptions"
            multiple
            use-input
            class="text-capitalize"
            options-dense
            clearable
            :options="existingCountiesList | capitalize_array"
            @filter="filterConcelhos"
            max-values="5"
            :label="$t('c.filter.counties')"
            style="width: 100%"
            @input="filterChanged"
          />
          <!-- counter
            hint="Max 5 selections" -->
        </div>

        <div>
          <q-select
            :color="inputLabelColor"
            dense
            filled
            bottom-slots
            v-model="sortBy"
            :options="optionsSort | capitalize_array"
            class="text-capitalize"
            :label="$t('c.filter.sort')"
            style="width: 90%"
            @input="filterChanged"
          />
        </div>

        <div class="q-mr-sm">
          <q-btn
            :text-color="toggleSortColor.color"
            :color="toggleSortColor.bg"
            class="q-mt-xs primary text-capitalize"
            dense
            unelevated
            size="md"
            :label="sortDesc ? $t('c.filter.descendent') : $t('c.filter.ascendent')"
            :icon="sortDesc ? 'eva-arrow-down' : 'eva-arrow-up'"
            @click="toggleSort"
          />
        </div>

        <div class="col">
          <q-input
            :color="inputLabelColor"
            class="col col-sm-10 float-right text-capitalize"
            v-model="search"
            filled
            dense
            clearable
            style="width: 100%"
            :label="$t('c.filter.search')"
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
      optionsSort: [this.$t('c.filter.county'), this.$t('c.filter.date'), this.$t('c.filter.likes')],
      search: '',
      sortBy: 'Data',
      sortDesc: true,

      sortTranslation: {
        Data: 'date',
        Concelho: 'county',
        Likes: 'likes',
        Date: 'date',
        County: 'county',
        Gostos: 'likes'
      },

      showFilterModal: false
    };
  },

  computed: {
    ...mapGetters('infos', ['existingCountiesList']),

    inputLabelColor() {
      return this.$q.dark.isActive ? 'grey-13' : 'primary';
    },

    toggleSortColor() {
      return this.$q.dark.isActive ? { bg: 'grey-9', color: 'grey-13' } : { bg: 'white', color: 'grey-9' };
    }
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
        this.optionsConcelhosFiltered = this.optionsConcelhos.filter((v) => v.toLowerCase().indexOf(needle) > -1);
      });
    },

    filterChanged() {
      this.$emit('onFilterChanged', {
        selectedOptions: this.selectedOptions ? this.lowerCaseArray(this.selectedOptions) : [],
        sortBy: this.sortTranslation[this.sortBy],
        sortType: this.sortDesc ? 'desc' : 'asc',
        searchString: this.search ? this.search : null
      });
    },

    lowerCaseArray(stringList) {
      return stringList.map((word) => word.toLowerCase());
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

<style lang="scss" scoped>
.body--dark {
  .q-page {
    background: $grey-9;
  }

  .q-header,
  .q-footer,
  .q-btn {
    background: $grey-10;
    color: $grey-13;

    &-sort {
      background: $grey-9;
    }
  }
}
</style>

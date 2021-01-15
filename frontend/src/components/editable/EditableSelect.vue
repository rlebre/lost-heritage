<template>
  <div>
    <q-select
      v-if="editable"
      filled
      use-input
      label="Concelho"
      v-model="inputData"
      :options="filteredConcelhos"
      @filter="filterConcelho"
      behavior="menu"
      input-debounce="0"
      max-values="1"
      @input="inputChanged"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>

      <template v-if="inputData" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop="inputData = null"
          class="cursor-pointer"
        />
      </template>
    </q-select>
    <h2 v-else class="col-12 building-county text-capitalize">
      {{ this.default }}
    </h2>
  </div>
</template>

<script>
import { debounce } from 'quasar';

export default {
  name: 'EditableSelect',

  props: {
    default: {
      type: String,
      required: true
    },
    entityField: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    doneState: {
      type: Boolean
    },
    inputClass: {
      type: String
    },
    editable: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      inputData: this.default,
      inputLoadingState: this.loadingState,
      inputDoneState: !!this.doneState,
      filteredConcelhos: []
    };
  },

  methods: {
    inputChanged() {
      this.$emit('inputChanged', {
        key: this.entityField,
        value: this.inputData
      });
    },

    filterConcelho(val, update) {
      if (val === '') {
        update(() => {
          this.filteredConcelhos = this.concelhos;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredConcelhos = this.concelhos.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  },

  created() {
    let concelhosDictionary = require('assets/concelhos.json');
    this.concelhos = Object.keys(concelhosDictionary);
    this.filteredConcelhos = this.concelhos;
  }
};
</script>

<style lang="scss" scoped>
.building {
  &-status {
    font-size: 14px;
    font-weight: 500;
    line-height: 0;
  }

  &-county {
    font-size: 16px;
    font-weight: 600;
    line-height: 0;
  }
}
</style>

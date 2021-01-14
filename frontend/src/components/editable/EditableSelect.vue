<template>
  <q-btn-toggle
    v-model="inputData"
    spread
    no-caps
    :class="
      `col-12 q-my-sm building-status building-${
        inputData ? 'recovered' : 'not-recovered'
      }`
    "
    unelevated
    toggle-color="primary"
    color="grey-4"
    text-color="grey-9"
    :options="[
      { label: 'Recovered', value: true },
      { label: 'Needs recovery', value: false }
    ]"
    @input="inputChanged"
  />
</template>

<script>
import { debounce } from 'quasar';

export default {
  name: 'EditableSelect',

  props: {
    default: {
      type: Boolean,
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
    }
  },

  data() {
    return {
      inputData: this.default,
      inputLoadingState: this.loadingState,
      inputDoneState: !!this.doneState
    };
  },

  methods: {
    inputChanged() {
      this.$emit('inputChanged', {
        key: this.entityField,
        value: this.inputData
      });
    }
  }
};
</script>

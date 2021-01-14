<template>
  <div>
    <q-btn-toggle
      v-if="editable"
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
    <h3
      v-else
      :class="
        `col-12 building-status building-${
          this.default ? 'recovered' : 'not-recovered'
        }`
      "
    >
      {{ this.default ? 'Recovered' : 'Needs recovery' }}
    </h3>
  </div>
</template>

<script>
import { debounce } from 'quasar';

export default {
  name: 'EditableToggle',

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

<style lang="scss" scoped>
.building {
  &-status {
    font-size: 14px;
    font-weight: 500;
    line-height: 0;
  }
}
</style>

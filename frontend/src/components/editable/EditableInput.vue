<template>
  <div>
    <h2 class="building-details-title" v-if="title">{{ title }}</h2>
    <q-input
      v-if="editable"
      v-model="inputData"
      filled
      :class="className || ''"
      autogrow
      type="textarea"
      :placeholder="placeholder || ''"
      :loading="inputLoadingState"
      @input="inputChanged"
      :input-class="inputClass"
    >
      <template v-slot:append v-if="inputDoneState">
        <q-icon color="positive" name="eva-checkmark-circle" />
      </template>
    </q-input>
    <p :class="className || ''" v-else>
      {{ defaultText || placeholder }}
    </p>
  </div>
</template>

<script>
import { debounce } from 'quasar';

export default {
  name: 'EditableInput',

  props: {
    defaultText: {
      type: String,
      required: true
    },
    title: {
      type: String
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
    className: {
      type: String
    },
    editable: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      inputData: this.defaultText,
      inputLoadingState: this.loadingState,
      inputDoneState: !!this.doneState
    };
  },

  watch: {
    inputData: debounce(function(newVal) {
      this.inputLoadingState = false;
      this.$emit('inputChanged', {
        key: this.entityField,
        value: this.inputData
      });
    }, 1500),

    doneState: function(newVal, oldVal) {
      this.inputDoneState = newVal;
    }
  },

  methods: {
    inputChanged() {
      this.inputDoneState = false;
      this.inputLoadingState = true;
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

  &-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 2rem;
  }

  &-county {
    font-size: 16px;
    font-weight: 600;
    line-height: 0;
  }

  &-details-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0;
  }
}
</style>

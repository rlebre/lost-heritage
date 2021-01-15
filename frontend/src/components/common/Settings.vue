<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="sliders" @hide="onClose">
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Settings</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-item-label header>Night Mode</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-moon" />
          </q-item-section>
          <q-item-section>
            <q-toggle
              v-model="$q.dark.isActive"
              @toggle="toggleDark"
              checked-icon="eva-moon-outline"
              unchecked-icon="eva-sun-outline"
              color="orange"
            />
          </q-item-section>
        </q-item>

        <q-item-label header>Language</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-globe" />
          </q-item-section>
          <q-item-section>
            <q-select
              class="text-capitalize"
              v-model="lang"
              :options="langOptions"
              dense
              borderless
              emit-value
              map-options
              options-dense
            />
          </q-item-section>
        </q-item>

        <q-item-label header>Instructions</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-question-mark-circle" />
          </q-item-section>
          <q-item-section>
            <q-btn dense label="Show" @click="instructionsModal = true" />
          </q-item-section>
        </q-item>

        <q-item-label header>About</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-info" />
          </q-item-section>
          <q-item-section>
            <q-btn dense label="Show" @click="aboutModal = true" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>

    <q-dialog v-model="instructionsModal">
      <q-card>
        <q-toolbar>
          <q-toolbar-title class="text-weight-bold">
            Instructions
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
            perferendis totam, ea at omnis vel numquam exercitationem aut, natus
            minima, porro labore.
          </p>

          <p>Need more help? E-mail me: ruilebre@ua.pt</p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="aboutModal">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>

          <q-toolbar-title class="text-weight-bold"
            >Lost Heritage</q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'Settings',

  props: {
    show: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      sliders: this.show,
      instructionsModal: false,
      aboutModal: false,

      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'pt-pt', label: 'Portuguese (Portugal)' }
      ],

      lang: 'English',

      slideVol: 39,
      slideAlarm: 56,
      slideVibration: 63
    };
  },

  watch: {
    show(newValue, oldValue) {
      this.sliders = newValue;
    },

    lang(lang) {
      this.$i18n.locale = lang;
    }
  },

  methods: {
    toggleDark() {
      this.$q.dark.toggle();
    },

    onClose() {
      this.$emit('onClose');
    }
  }
};
</script>

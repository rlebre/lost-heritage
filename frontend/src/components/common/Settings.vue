<template>
  <div>
    <q-dialog v-model="sliders" @hide="onClose">
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-capitalize">
            {{ $t('c.settings.settings') }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-item-label header class="text-capitalize">
          {{ $t('c.settings.nightMode') }}
        </q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-moon" />
          </q-item-section>
          <q-item-section>
            <q-toggle
              v-model="darkMode"
              @input="$q.dark.toggle"
              checked-icon="eva-moon-outline"
              unchecked-icon="eva-sun-outline"
              color="orange"
            />
          </q-item-section>
        </q-item>

        <q-item-label header class="text-capitalize">
          {{ $t('c.settings.language') }}
        </q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-globe" />
          </q-item-section>
          <q-item-section>
            <q-select
              class="text-capitalize"
              v-model="lang"
              :options="langOptions"
              emit-value
              dense
              map-options
            />
          </q-item-section>
        </q-item>

        <q-item-label header class="text-capitalize">
          {{ $t('c.settings.instructions') }}
        </q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-question-mark-circle" />
          </q-item-section>
          <q-item-section>
            <q-btn
              dense
              class="text-capitalize"
              :label="$t('c.settings.show')"
              @click="instructionsModal = true"
            />
          </q-item-section>
        </q-item>

        <q-item-label header class="text-capitalize">
          {{ $t('c.settings.about') }}
        </q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-info" />
          </q-item-section>
          <q-item-section>
            <q-btn
              dense
              class="text-capitalize"
              :label="$t('c.settings.show')"
              @click="aboutModal = true"
            />
          </q-item-section>
        </q-item>

        <q-item-label header class="text-capitalize">
          {{ $t('c.settings.tc') }}
        </q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-book" />
          </q-item-section>
          <q-item-section>
            <q-btn
              dense
              class="text-capitalize"
              :label="$t('c.settings.show')"
              @click="tcModal = true"
            />
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>

    <q-dialog v-model="instructionsModal">
      <q-card>
        <q-toolbar>
          <q-avatar rounded>
            <img src="lost-heritage.png" />
          </q-avatar>

          <q-toolbar-title class="text-weight-bold text-capitalize">
            {{ $t('c.settings.instructions') }}
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="q-pa-sm">
          <div class="text-h6">
            {{ $t('instructions.wantSubmit') }}
          </div>
          <ol class="q-mt-auto q-mb-sm">
            <li>
              {{ $t('instructions.wantTopics[0]') }} (<q-btn
                flat
                round
                icon="eva-plus-circle-outline"
                size="12px"
                dense
                to="/new-post"
              />)
            </li>
            <li
              v-for="(entry, index) in $t('instructions.wantTopics').slice(1)"
              :key="index"
            >
              {{ entry }}
            </li>
          </ol>

          <p>
            {{ $t('instructions.want1') }}
          </p>

          <p>
            {{ $t('instructions.want2') }}
          </p>

          <div class="text-h6">{{ $t('instructions.stillSearching') }}</div>
          <p>
            {{ $t('instructions.still1') }}
            <a href="mailto:patrimonioesquecido2020@gmail.com">
              patrimonioesquecido2020@gmail.com
            </a>
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="aboutModal">
      <q-card>
        <q-toolbar>
          <q-avatar rounded>
            <img src="lost-heritage.png" />
          </q-avatar>

          <q-toolbar-title class="text-weight-bold">
            Lost Heritage
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section
          v-for="(paragraph, index) in $t('about.paragraphs')"
          :key="index"
        >
          {{ paragraph }}
        </q-card-section>

        <q-card-section>
          <p>
            {{ $t('about.checknews') }}
            <a
              href="https://www.publico.pt/2020/09/20/local/noticia/portugueses-desafiados-descobrir-patrimonio-esquecido-1932046"
              >in Publico by Maria José Santana</a
            >
          </p>

          <p>
            {{ $t('about.follow') }}
            <a href="https://www.facebook.com/patrimonioesquecido">Facebook</a>
          </p>

          <p>
            {{ $t('about.contribute') }}
            <a href="https://github.com/rlebre/lost-heritage">GitHub</a>
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="tcModal">
      <TermsAndConditions />
    </q-dialog>
  </div>
</template>

<script>
import TermsAndConditions from 'components/common/TermsAndConditions';

export default {
  name: 'Settings',

  components: {
    TermsAndConditions
  },

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
      tcModal: false,
      darkMode: this.$q.dark.isActive,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'pt-pt', label: 'Portuguese (Portugal)' }
      ],

      lang: 'Portuguese (Portugal)',

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
    onClose() {
      this.$emit('onClose');
    }
  }
};
</script>

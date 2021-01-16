<template>
  <div>
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
              v-model="darkMode"
              @input="$q.dark.toggle"
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
              emit-value
              dense
              map-options
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

        <q-item-label header>Terms & Conditions</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="eva-book" />
          </q-item-section>
          <q-item-section>
            <q-btn dense label="Show" @click="tcModal = true" />
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

          <q-toolbar-title class="text-weight-bold">
            Instructions
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="q-pa-sm">
          <div class="text-h6">Want to submit?</div>
          <ol class="q-mt-auto q-mb-sm">
            <li>
              Go to Create Post page (<q-btn
                flat
                round
                icon="eva-plus-circle-outline"
                size="12px"
                dense
                to="/new-post"
              />)
            </li>
            <li>Fill in at least the required fields</li>
            <li>If you have, upload some images of the building</li>
            <li>Accept our terms and conditions, if you agree with them</li>
            <li>Submit and... it's done!</li>
          </ol>

          <p>
            Now, our curators will look into your post. If the building was
            already posted, don't worry, we will look into it and update with
            the awesome informations you sent.
          </p>

          <p>
            If everything fits our T&C, your post will be available for everyone
            soon! Bear in mind that posts containing racism, nudity or some sort
            of discrimination will not be tolerated and the submitter will be
            banned.
          </p>

          <div class="text-h6">Still searching for help?</div>
          <p>
            Need more help with the platform? Found a bug? Want to contribute
            with you programming skills? Have a suggestion? E-mail us:
            <a href="mailto:ruilebre@ua.pt">ruilebre@ua.pt</a>
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

        <q-card-section>
          Lost Heritage is a non-profit project. The main goal of the project is
          to map and gather information about abandoned public buildings in
          Portugal.
        </q-card-section>

        <q-card-section>
          Once the information about the buildings is centralized, it can be
          used to develop plans and public discussion about the recovering of
          such legacy.
        </q-card-section>

        <q-card-section>
          In fact, there are many good examples in the field. Our platform maps
          also heritage which was once forgotten but nowadays has gained a new
          purpose.
        </q-card-section>

        <q-card-section>
          Feel free to contribute! Lost Heritage platform is open to any citizen
          of the world, because there are no boundaries and we all are seeking
          for a common goal. The maintainers of the project thank for your
          contribution. However, please bear in mind that for quality purposes,
          the contributions will be curated and may be edited before approval by
          our curators.
        </q-card-section>

        <q-card-section>
          <p>
            Check out the news:
            <a
              href="https://www.publico.pt/2020/09/20/local/noticia/portugueses-desafiados-descobrir-patrimonio-esquecido-1932046"
              >in Publico by Maria José Santana</a
            >
          </p>

          <p>
            Follow us on social media:
            <a href="https://www.facebook.com/patrimonioesquecido">Facebook</a>
          </p>

          <p>
            Contribute for this open-source platform:
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
    onClose() {
      this.$emit('onClose');
    }
  }
};
</script>

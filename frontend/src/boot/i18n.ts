import { boot } from 'quasar/wrappers';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n;
  }
}

Vue.use(VueI18n);

const messages = {
  en: {
    message: {
      appName: 'Lost Heritage'
    }
  },
  pt: {
    message: {
      appName: 'Património Esquecido'
    }
  }
}

export const i18n = new VueI18n({
  locale: 'en-us',
  messages
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n;
});

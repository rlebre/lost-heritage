import axios, { AxiosInstance } from 'axios';
import { LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ store, Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;

  const token = LocalStorage.getItem('user_token');
  if (token) {
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  store.$axios = axios;
});

import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import routes from './routes';
import * as VueGoogleMaps from 'vue2-google-maps';


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route(function ({ Vue }) {
  Vue.use(VueRouter);
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCyCLaxQj1be6nNe5ii559A1DY-cqM3Z8s',
      installComponents: true
    }
  });

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
})

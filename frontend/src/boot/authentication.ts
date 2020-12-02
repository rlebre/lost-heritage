import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'
import * as jwt from 'jsonwebtoken';
import moment from 'moment';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default boot(async ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const storeJwt = store.getters['auth/getJwtToken'];
      const localStorageJwt = LocalStorage.getItem('user_token');

      if (storeJwt == null || localStorageJwt == null || storeJwt != localStorageJwt) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        });
      } else {
        const decodedToken = jwt.decode(storeJwt)

        if (!decodedToken) {
          next({
            path: '/login',
            params: { nextUrl: to.fullPath }
          });
          return;
        }

        const expDate = moment.unix(decodedToken.exp);
        const isValid = moment().isBefore(expDate);

        if (!isValid) {
          next({
            path: '/login',
            params: { nextUrl: to.fullPath }
          });
        } else {
          next();
        }
      }
    } else {
      next();
    }
  });
});

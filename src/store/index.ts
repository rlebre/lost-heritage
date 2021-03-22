import Vue from 'vue'
import Vuex from 'vuex'

import posts from './posts'
import infos from './infos'
import comments from './comments'
import auth from './auth'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function () {
  const Store = new Vuex.Store({
    modules: {
      posts,
      infos,
      comments,
      auth
    },
  })

  return Store
}

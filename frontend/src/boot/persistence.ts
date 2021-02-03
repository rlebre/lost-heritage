import { Cookies } from 'quasar'
import createPersistedState from 'vuex-persistedstate'

export default function ({ store, ssrContext }: any) {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  createPersistedState({
    paths: ['auth'],
    storage: {
      getItem(key) {
        return JSON.stringify(cookies.get(key))
      },
      setItem(key, value) {
        cookies.set(key, value)
      },
      removeItem(key) {
        cookies.remove(key)
      }
    }
  })(store)
}
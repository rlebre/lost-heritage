import { boot } from 'quasar/wrappers'
import { dynamicSort } from '../helpers/dynamicSort';

export default boot(({ Vue }) => {
  Vue.prototype.$dynamicSort = dynamicSort;
})

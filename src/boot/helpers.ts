import { boot } from 'quasar/wrappers'
import { dynamicSort } from '../helpers/dynamicSort';
import { niceDate } from '../helpers/niceDate';

export default boot(({ Vue }) => {
  Vue.prototype.$dynamicSort = dynamicSort;
  Vue.prototype.$niceDate = niceDate;
})

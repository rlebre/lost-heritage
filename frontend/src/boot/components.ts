import { boot } from 'quasar/wrappers';

import FeedCard from 'components/feed/FeedCard.vue';
import MapComponent from 'components/map/MapComponent.vue';
import ListComponent from 'components/map/ListComponent.vue';
import ListCardComponent from 'components/map/ListCardComponent.vue';


// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default boot(({ Vue }) => {
  Vue.component('FeedCard', FeedCard);
  Vue.component('MapComponent', MapComponent)
  Vue.component('ListComponent', ListComponent)
  Vue.component('ListCardComponent', ListCardComponent)
})

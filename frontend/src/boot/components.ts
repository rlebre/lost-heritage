import { boot } from 'quasar/wrappers';

import FeedCard from 'components/feed/FeedCard.vue';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default boot(({ Vue }) => {
  console.log("aaaaaaaaaa");
  Vue.component('FeedCard', FeedCard);
})

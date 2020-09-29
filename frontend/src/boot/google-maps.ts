const VueGoogleMaps = require('vue2-google-maps');

import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCyCLaxQj1be6nNe5ii559A1DY-cqM3Z8s',
            installComponents: true
        }
    });
});

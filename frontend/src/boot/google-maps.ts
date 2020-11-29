const VueGoogleMaps2 = require('vue2-google-maps');

import 'vue-googlemaps/dist/vue-googlemaps.css';
import VueGoogleMaps from 'vue-googlemaps';

import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
    Vue.use(VueGoogleMaps2, {
        load: {
            key: 'AIzaSyCyCLaxQj1be6nNe5ii559A1DY-cqM3Z8s',
            installComponents: true
        }
    });

    Vue.use(VueGoogleMaps, {
        load: {
            // Google API key
            apiKey: 'AIzaSyCyCLaxQj1be6nNe5ii559A1DY-cqM3Z8s',
            // Use new renderer
            useBetaRenderer: false,
        },
    })
});

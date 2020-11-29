import 'vue-googlemaps/dist/vue-googlemaps.css';
import VueGoogleMaps from 'vue-googlemaps';

import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
    Vue.use(VueGoogleMaps, {
        load: {
            // Google API key
            apiKey: 'AIzaSyCyCLaxQj1be6nNe5ii559A1DY-cqM3Z8s',
            // Use new renderer
            useBetaRenderer: false,
        },
    })
});

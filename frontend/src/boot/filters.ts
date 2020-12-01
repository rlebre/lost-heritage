import { boot } from 'quasar/wrappers';
import { date } from 'quasar';

export default boot(({ Vue }) => {
    Vue.filter('str_limit', (value: string, size: any) => {
        if (!value) return '';
        value = value.toString();

        if (value.length <= size) {
            return value;
        }
        return value.substr(0, size) + '...';
    });

    Vue.filter('capitalize', (value: string) => {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    })

    Vue.filter('capitalize_array', (values: any) => {
        if (!values) return []

        return values.map((value: any) => value.toString().charAt(0).toUpperCase() + value.slice(1))
    })

    Vue.filter('commentDate', (value: string) => {
        return date.formatDate(value, 'DD/MM/YY, HH:mm');
    });
});
import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
    Vue.filter('str_limit', (value: string, size: any) => {
        if (!value) return '';
        value = value.toString();

        if (value.length <= size) {
            return value;
        }
        return value.substr(0, size) + '...';
    });
});
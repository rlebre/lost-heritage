
import { date } from 'quasar';

export function niceDate(value: string) {
    return date.formatDate(value, 'MMMM D, HH:mm');
}
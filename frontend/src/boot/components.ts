import { boot } from 'quasar/wrappers';

import FeedCard from 'components/feed/FeedCard.vue';
import MapComponent from 'components/map/MapComponent.vue';
import ListComponent from 'components/map/ListComponent.vue';
import ListCardComponent from 'components/map/ListCardComponent.vue';
import MapLocationPicker from 'components/new-post/MapLocationPicker.vue';
import LocationPickerDialog from 'components/new-post/LocationPickerDialog.vue';
import PostFilter from 'components/common/PostFilter.vue';
import ImagePicker from 'components/common/ImagePicker.vue';
import CommentsBox from 'components/post-details/CommentsBox.vue';
import PostCard from 'components/admin/PostCard.vue';
import PendingPostsTable from 'components/admin/PendingPostsTable.vue';
import ApprovedPostsTable from 'components/admin/ApprovedPostsTable.vue';
import DeclinedPostsTable from 'components/admin/DeclinedPostsTable.vue';
import EditableInput from 'components/editable/EditableInput.vue';
import EditableToggle from 'components/editable/EditableToggle.vue';
import EditableSelect from 'components/editable/EditableSelect.vue';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default boot(({ Vue }) => {
  Vue.component('FeedCard', FeedCard);
  Vue.component('MapComponent', MapComponent);
  Vue.component('ListComponent', ListComponent);
  Vue.component('ListCardComponent', ListCardComponent);
  Vue.component('MapLocationPicker', MapLocationPicker);
  Vue.component('LocationPickerDialog', LocationPickerDialog);
  Vue.component('PostFilter', PostFilter);
  Vue.component('ImagePicker', ImagePicker);
  Vue.component('CommentsBox', CommentsBox);
  Vue.component('PostCard', PostCard);
  Vue.component('PendingPostsTable', PendingPostsTable);
  Vue.component('ApprovedPostsTable', ApprovedPostsTable);
  Vue.component('DeclinedPostsTable', DeclinedPostsTable);
  Vue.component('EditableInput', EditableInput);
  Vue.component('EditableSelect', EditableSelect);
  Vue.component('EditableToggle', EditableToggle);
})

<template>
  <q-page class="constrain-more q-pa-md">
    <div>
      <h4
        :class="
          'text-h4 q-ma-sm '.concat(
            $q.dark.isActive ? 'text-grey-13' : 'text-grey-10'
          )
        "
      >
        Create new post
      </h4>
    </div>

    <div>
      <h6
        :class="
          'text-weight-light q-ma-sm '.concat(
            $q.dark.isActive ? 'text-grey-13' : 'text-grey-10'
          )
        "
      >
        Contributor Information
      </h6>
    </div>

    <div class=" q-ma-md">
      <q-input
        v-model="newPost.contributorName"
        class="col col-sm-10"
        label="Contributor Name"
        filled
      />
    </div>

    <div class=" q-ma-md">
      <q-input
        v-model="newPost.contributorEmail"
        class="col col-sm-10"
        label="Contributor Email"
        filled
      />
    </div>

    <div class=" q-ma-md">
      <q-input
        v-model="newPost.contributorCity"
        class="col col-sm-10"
        label="Contributor City"
        filled
      />
    </div>

    <div>
      <h6
        :class="
          'text-weight-light q-ma-sm ) '.concat(
            $q.dark.isActive ? 'text-grey-13' : 'text-grey-10'
          )
        "
      >
        Building Information
      </h6>
    </div>

    <div class=" q-ma-md">
      <q-input
        v-model="newPost.title"
        class="col col-sm-10"
        label="Title"
        filled
      />
    </div>

    <div class="q-ma-md">
      <q-input
        v-model="newPost.details"
        filled
        autogrow
        class="col col-sm-10"
        label="Details"
        type="textarea"
      />
    </div>

    <q-select
      class="q-ma-md"
      filled
      use-input
      label="Concelho"
      v-model="newPost.county"
      :options="filteredConcelhos"
      @filter="filterConcelho"
      behavior="menu"
      input-debounce="0"
      max-values="1"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <div class="q-ma-md">
      <q-input
        :loading="locationLoading"
        v-model="location"
        class="col col-sm-10"
        label="Pick or Locate Below"
        filled
        disable
      >
      </q-input>
      <q-btn-group flat spread class="q-mt-sm">
        <q-btn
          class="q-mr-sm"
          dense
          flat
          color="primary"
          icon="eva-pin-outline"
          label="Pick"
          @click="toggleShowLocationPickerDialog"
        />

        <q-btn
          dense
          flat
          color="primary"
          icon="eva-navigation-2-outline"
          label="Locate"
          @click="getLocation"
        />
      </q-btn-group>
    </div>

    <LocationPickerDialog
      v-if="showLocationPickerDialog"
      @closed="showLocationPickerDialog = false"
      @pickedLocation="applyLocation"
    ></LocationPickerDialog>

    <div class="q-ma-md">
      <q-input
        v-model="newPost.previousFunctions"
        filled
        autogrow
        class="col col-sm-10"
        label="Previous Functions"
        type="textarea"
      />
    </div>

    <div class="q-ma-md">
      <q-input
        v-model="newPost.stories"
        filled
        autogrow
        class="col col-sm-10"
        label="Relevant Stories"
        type="textarea"
      />
    </div>

    <div class="q-ma-md">
      <q-input
        v-model="newPost.suggestedFunctions"
        filled
        autogrow
        class="col col-sm-10"
        label="Suggested Functions"
        type="textarea"
      />
    </div>

    <q-btn-toggle
      v-model="newPost.isRecovered"
      spread
      class="q-ma-sm q-mx-md text-grey-9"
      no-caps
      unelevated
      toggle-color="primary"
      color="grey-4"
      text-color="grey-9"
      :options="[
        { label: 'Recovered', value: true },
        { label: 'Needs recovery', value: false }
      ]"
    />

    <div class="q-ma-sm text-grey-9">
      <ImagePicker :postUid="newPost.uid"></ImagePicker>
    </div>

    <div class="q-ma-sm text-grey-9">
      <q-checkbox
        :class="
          'col col-sm-10 '.concat(
            $q.dark.isActive ? 'text-grey-13' : 'text-grey-10'
          )
        "
        v-model="newPost.newsletterAgree"
        label="I want to receive e-mails with news."
      />
    </div>

    <div class="q-ma-sm text-grey-9">
      <q-checkbox
        :class="
          'col col-sm-10 '.concat(
            $q.dark.isActive ? 'text-grey-13' : 'text-grey-10'
          )
        "
        v-model="tncAgree"
        label="I agree with the T&C, recognizing that the personal data will be stored for validation and possible future contact."
      />
    </div>

    <div class="row justify-center q-mt-lg">
      <q-btn
        unelevated
        color="primary"
        label="Submit"
        @click="addPost"
        :disable="
          !newPost.contributorEmail ||
            !newPost.title ||
            !newPost.details ||
            !(newPost.lat && newPost.lng) ||
            !tncAgree ||
            isUploadingImages
        "
      ></q-btn>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar';
import { mapGetters, mapActions } from 'vuex';
import { isCreatePostSuccess, isCreatingPost } from '../store/posts/getters';

export default {
  name: 'PageCreatePost',
  data() {
    return {
      newPost: {
        uid: '',
        contributorName: '',
        contributorEmail: '',
        contributorCity: '',
        title: '',
        details: '',
        county: '',
        lat: '',
        lng: '',
        previousFunctions: '',
        stories: '',
        suggestedFunctions: '',
        newsletterAgree: false,
        images: [],
        date: Date.now(),
        isRecovered: false
      },
      location: '',
      locationLoading: false,
      tncAgree: false,
      showLocationPickerDialog: false,
      concelhos: [],
      filteredConcelhos: []
    };
  },

  computed: {
    ...mapGetters('posts', [
      'uploadedImages',
      'isUploadingImages',
      'isCreatingPost',
      'isCreatePostSuccess',
      'errors',
      'lastCreatedPost'
    ])
  },

  watch: {
    uploadedImages(newValue, oldValue) {
      this.newPost.images = newValue;
    },

    isCreatingPost(newValue, oldValue) {
      if (newValue && !oldValue) {
        this.$q.loading.show();
      }

      if (!newValue && oldValue) {
        this.$q.loading.hide();
        if (this.isCreatePostSuccess) {
          this.$router.push('/');
          this.$forceUpdate();
          this.$q.notify({
            message: '<p style="text-align:center">Post created<p>',
            html: true,
            timeout: 5000,
            actions: [
              {
                icon: 'close',
                color: 'white'
              },
              {
                icon: 'eva-arrow-circle-right',
                color: 'white',
                handler: () => {
                  this.$router.push(`/post/${this.lastCreatedPost._id}`);
                  this.$forceUpdate();
                }
              }
            ]
          });
        } else {
          this.errors.forEach(error => {
            this.$q.notify({
              title: 'Error',
              group: false,
              message: error.detail,
              timeout: 10000,
              progress: true,
              actions: [
                {
                  icon: 'close',
                  color: 'white'
                }
              ]
            });
          });
        }
      }
    }
  },

  methods: {
    ...mapActions('posts', ['createPost', 'uploadImages']),

    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(
        position => {
          this.newPost.lng = position.coords.longitude;
          this.newPost.lat = position.coords.latitude;
        },
        error => {
          console.log(error);
          this.locationError(error);
        },
        { timeout: 10000 }
      );
    },

    locationError(error) {
      this.$q.dialog({
        title: 'Error',
        message: 'Could not find your location.'
      });
      this.locationLoading = false;
    },

    toggleShowLocationPickerDialog() {
      this.showLocationPickerDialog ^= true;
    },

    applyLocation(location) {
      let lat = location.lat.toFixed(5);
      let lng = location.lng.toFixed(5);
      this.location = `${lat}, ${lng}`;
      this.newPost.lat = lat;
      this.newPost.lng = lng;
    },

    filterConcelho(val, update) {
      if (val === '') {
        update(() => {
          this.filteredConcelhos = this.concelhos;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredConcelhos = this.concelhos.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    addPost() {
      this.createPost(this.newPost);
    }
  },
  created() {
    let concelhosDictionary = require('assets/concelhos.json');
    this.concelhos = Object.keys(concelhosDictionary);
    this.filteredConcelhos = this.concelhos;

    this.newPost.uid = uid();
  }
};
</script>

<style lang="scss">
.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.camera-frame {
  border: 1px solid $grey-5;
  border-radius: 5px;
}

.remove-xtra-margin {
  margin-bottom: -5px;
}
</style>

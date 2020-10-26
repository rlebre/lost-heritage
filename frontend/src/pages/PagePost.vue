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
        v-model="newPost.contributorAddress"
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
      v-model="newPost.concelho"
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
        v-model="newPost.location"
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

    <div class="row text-center">
      <div
        class="col-12 col-sm-4"
        v-for="(image, idx) in newPost.photos"
        :key="idx"
      >
        <div class="q-mt-lg">
          <div class="q-mb-sm">
            <q-btn
              round
              unelevated
              color="primary"
              icon="eva-trash-outline"
              size="xs"
              @click="deletePhotoFromUploadQueue(idx)"
            />
          </div>
          <img
            style="max-width: 70%; min-height:100%"
            :src="image"
            alt=""
            ref="picture"
          />
          <div>
            <q-input
              dense
              filled
              autogrow
              class="col col-sm-10 q-ml-lg q-mr-lg q-px-sm"
              label="Description"
              type="textarea"
              maxlength="30"
            />
          </div>
        </div>
      </div>

      <q-file
        outlined
        class="q-mx-md q-ma-lg"
        v-model="imageUpload"
        label="Choose an image"
        accept="image/*"
        multiple
        use-chips
        max-files="4"
        append
        @input="captureImageFallback"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
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
        label="Post Image"
        @click="addPost"
        :disable="
          !newPost.title ||
            !newPost.details ||
            newPost.photos.length <= 0 ||
            !(newPost.lat && newPost.lng)
        "
      ></q-btn>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar';
require('md-gum-polyfill');

export default {
  name: 'PagePost',
  data() {
    return {
      newPost: {
        id: uid(),
        contributorName: '',
        contributorEmail: '',
        contributorAddress: '',
        title: '',
        details: '',
        concelho: '',
        location: '',
        lat: '',
        lng: '',
        previousFunctions: '',
        stories: '',
        suggestedFunctions: '',
        newsletterAgree: false,
        photos: [],
        date: Date.now(),
        isRecovered: false
      },
      imageCaptured: false,
      imageUpload: [],
      locationLoading: false,
      tncAgree: false,
      showLocationPickerDialog: false,
      concelhos: [],
      filteredConcelhos: []
    };
  },

  computed: {
    locationSupported() {
      return 'geolocation' in navigator;
    }
  },

  methods: {
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1]);

      var mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ab], { type: mimeString });
      return blob;
    },

    captureImageFallback(files) {
      var URL = window.URL || window.webkitURL;

      for (let i in this.newPost.photos) {
        this.$set(this.newPost.photos, i, '');
      }

      // TODO
      // Trolha way
      this.newPost.photos = [];

      files.forEach((file, index) => {
        var fileReader = new FileReader();

        fileReader.onload = event => {
          this.newPost.photos.push(event.target.result);
        };
        fileReader.readAsDataURL(file);
      });
    },

    deletePhotoFromUploadQueue(idx) {
      this.newPost.photos.splice(idx, 1);
      this.imageUpload.splice(idx, 1);
    },

    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(
        position => {
          this.newPost.lng = position.coords.longitude;
          this.newPost.lat = position.coords.latitude;
          this.getCityAndCountry(position);
        },
        error => {
          console.log(error);
          this.locationError(error);
        },
        { timeout: 10000 }
      );
    },

    getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`;
      this.$axios.get(apiUrl).then(
        result => {
          this.locationSuccess(result);
        },
        error => {
          console.log(error);
          this.locationError(error);
        }
      );
    },

    locationSuccess(result) {
      this.newPost.location = result.data.city;
      if (result.data.country)
        this.newPost.location += `, ${result.data.country}`;
      this.locationLoading = false;
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
      this.newPost.location = `${lat}, ${lng}`;
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
      this.$q.loading.show();

      let formData = new FormData();
      formData.append('id', this.newPost.id);
      formData.append('details', this.newPost.details);
      formData.append('title', this.newPost.title);
      formData.append('location', this.newPost.location);
      formData.append('lat', this.newPost.lat);
      formData.append('lng', this.newPost.lng);
      formData.append('date', this.newPost.date);
      formData.append('isRecovered', this.newPost.isRecovered);
      this.newPost.photos.forEach((photo, index) => {
        formData.append(
          `files[${index}]`,
          this.dataURItoBlob(photo),
          `${this.newPost.id}_${index}.png`
        );
      });

      this.$axios
        .post(`${process.env.API}/createPost`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(
          response => {
            this.$router.push('/');
            this.$forceUpdate();

            this.$q.notify({
              message: 'Post created.',
              actions: [
                {
                  label: 'Dismiss',
                  color: 'white'
                }
              ]
            });

            this.$q.loading.hide();
          },
          error => {
            this.$q.dialog({
              title: 'Error',
              message: 'Sorry, could not create newPost.'
            });

            this.$q.loading.hide();
          }
        );
    }
  },
  created() {
    let concelhosDictionary = require('assets/concelhos.json');
    this.concelhos = Object.keys(concelhosDictionary);
    this.filteredConcelhos = this.concelhos;
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

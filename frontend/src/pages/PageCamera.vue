<template>
  <q-page class="constrain-more q-pa-md">
    <div>
      <h4 class="text-h4 q-ma-sm ">Create new post</h4>
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

    <div class="q-ma-md">
      <q-input
        :loading="locationLoading"
        v-model="newPost.location"
        class="col col-sm-10"
        label="Location"
        filled
      >
        <template
          v-slot:append
          v-if="!this.locationLoading && locationSupported"
        >
          <q-btn
            round
            dense
            flat
            icon="eva-navigation-2-outline"
            @click="getLocation"
          />
        </template>
      </q-input>
    </div>

    <div class="q-ma-sm text-grey-9">
      <q-checkbox
        class="col col-sm-10"
        v-model="newPost.isRecovered"
        label="Recovered"
      />
    </div>

    <div class="row text-center">
      <div
        class="col-12 col-sm-4"
        v-for="(image, idx) in loadedImages"
        :key="idx"
      >
        <div class="q-mt-lg">
          <div class="q-mb-sm">
            <q-btn round unelevated color="primary" label="X" size="xs" />
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
              class="col col-sm-10 q-ml-lg q-mr-lg"
              label="Description"
              type="textarea"
            />
          </div>
        </div>
      </div>

      <q-file
        outlined
        class="q-mx-md q-mt-lg"
        v-model="imageUpload"
        label="Choose an image"
        accept="image/*"
        multiple
        use-chips
        max-files="4"
        append
        @input="captureImageFallback"
        @clear="fileCleared"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
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
  name: 'PageCamera',
  data() {
    return {
      newPost: {
        id: uid(),
        title: '',
        details: '',
        location: '',
        lat: '',
        lng: '',
        photos: [],
        date: Date.now(),
        isRecovered: false
      },
      imageCaptured: false,
      imageUpload: [],
      locationLoading: false,
      loadedImages: [],
      blalba: ''
    };
  },
  computed: {
    locationSupported() {
      return 'geolocation' in navigator;
    }
  },
  methods: {
    addMorePhotos() {
      this.imageCaptured = false;
      this.initCamera();
    },
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

      for (let i in this.loadedImages) {
        this.$set(this.loadedImages, i, '');
      }

      files.forEach((file, index) => {
        var imgURL = URL.createObjectURL(file, index);

        this.$set(this.loadedImages, index, imgURL);
      });
    },
    fileCleared(value) {
      console.log(`File cleared ${value}`);
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
          photo,
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
  }
};
</script>

<style lang="scss">
.camera-frame {
  border: 1px solid $grey-5;
  border-radius: 5px;
}

.remove-xtra-margin {
  margin-bottom: -5px;
}
</style>

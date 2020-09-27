<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video class="full-width" autoplay ref="video" v-show="!imageCaptured" />
      <canvas
        ref="canvas"
        class="full-width"
        height="248"
        v-show="imageCaptured"
      />
    </div>
    <div class="text-center q-pa-md">
      <template v-if="hasCameraSupport">
        <q-btn
          class="q-mr-sm"
          round
          color="grey-10"
          icon="eva-camera"
          size="lg"
          @click="captureImage"
          :disable="imageCaptured"
        />

        <q-btn
          v-if="imageCaptured"
          round
          color="grey-10"
          icon="eva-plus-outline"
          size="lg"
          @click="captureImage"
        />
      </template>

      <q-file
        v-else
        outlined
        v-model="imageUpload"
        label="Choose an image"
        accept="image/*"
        @input="captureImageFallback"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        v-model="post.caption"
        class="col col-sm-6"
        label="Standard"
        dense
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        :loading="locationLoading"
        v-model="post.location"
        class="col col-sm-6"
        label="Location"
        dense
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
    <div class="row justify-center q-mt-lg">
      <q-btn
        unelevated
        rounded
        color="primary"
        label="Post Image"
        @click="addPost"
        :disable="!post.caption || !post.photo"
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
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now()
      },
      imageCaptured: false,
      imageUpload: [],
      hasCameraSupport: true,
      locationLoading: false
    };
  },
  computed: {
    locationSupported() {
      return 'geolocation' in navigator;
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(stream => {
          this.$refs.video.srcObject = stream;
        })
        .catch(error => {
          this.hasCameraSupport = false;
        });
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;

      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;

      let context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      this.imageCaptured = true;

      this.post.photo = this.dataURItoBlob(canvas.toDataURL());
      this.disableCamera();
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
    captureImageFallback(file) {
      this.post.photo = file;
      let canvas = this.$refs.canvas;
      let context = canvas.getContext('2d');

      var reader = new FileReader();
      reader.onload = event => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.imageCaptured = true;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop();
      });
    },
    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
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
      this.post.location = result.data.city;
      if (result.data.country) this.post.location += `, ${result.data.country}`;
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
      formData.append('id', this.post.id);
      formData.append('caption', this.post.caption);
      formData.append('location', this.post.location);
      formData.append('date', this.post.date);
      formData.append('file', this.post.photo, this.post.id + '.png');

      this.$axios.post(`${process.env.API}/createPost`, formData).then(
        response => {
          this.$router.push('/');

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
            message: 'Sorry, could not create post.'
          });

          this.$q.loading.hide();
        }
      );
    }
  },
  mounted() {
    this.initCamera();
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  }
};
</script>

<style lang="scss">
.camera-frame {
  border: 2px solid $grey-10;
  border-radius: 10px;
}
</style>

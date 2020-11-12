<template>
  <div class="row text-center">
    <div v-if="isUploadingImages" class="col-12 q-mt-lg q-mb-sm">
      <q-spinner color="primary" size="xl" :thickness="10" />
      <q-tooltip :offset="[0, 8]">Uploading images</q-tooltip>
    </div>
    <div
      v-else
      class="col-12 col-sm-4"
      v-for="(image, idx) in imagesUploaded"
      :key="`${idx}`"
    >
      <div class="q-mt-lg">
        <div class="q-mb-sm">
          <q-btn
            round
            unelevated
            color="primary"
            icon="eva-trash-outline"
            size="xs"
            @click="deletePhotoFromUploadQueue(image)"
          />
        </div>
        <img style="max-width: 70%; min-height:100%" :src="image.url" />
      </div>
    </div>

    <q-file
      outlined
      class="q-mx-md q-ma-lg"
      v-model="selectedImageFiles"
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ImagePicker',

  data() {
    return {
      selectedImageFiles: [],
      imagesUploaded: []
    };
  },

  props: {
    postUid: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('posts', ['uploadedImages', 'isUploadingImages'])
  },

  watch: {
    uploadedImages(newValue, oldValue) {
      this.imagesUploaded = newValue;
    }
  },

  methods: {
    ...mapActions('posts', ['uploadImages', 'removeImageFromList']),

    captureImageFallback() {
      this.uploadImages({
        images: this.selectedImageFiles,
        postUid: this.postUid
      });
    },

    deletePhotoFromUploadQueue(image) {
      this.removeImageFromList({ imageKey: image.key, postUid: image.postUid });

      this.selectedImageFiles = this.selectedImageFiles.filter(
        selectedImg => selectedImg.name !== image.name
      );
    }
  }
};
</script>

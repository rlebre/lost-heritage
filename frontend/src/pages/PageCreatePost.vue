<template>
  <q-page class="constrain-more q-pa-md">
    <div>
      <h4 class="text-h4 q-ma-sm first-letter-uppercase">
        {{ $t('create.createNewPost') }}
      </h4>
    </div>

    <div>
      <h6 class="text-weight-light q-ma-sm text-capitalize">
        {{ $t('create.contributorInfo') }}
      </h6>
    </div>

    <div class=" q-ma-md">
      <q-input
        v-model="newPost.contributorName"
        class="col col-sm-10 text-capitalize"
        :label="$t('create.contributorName')"
        filled
      />
    </div>

    <div class=" q-ma-md">
      <q-input
        v-model="newPost.contributorEmail"
        class="col col-sm-10 text-capitalize"
        :label="$t('create.contributorEmail')"
        filled
      />
    </div>

    <div class=" q-ma-md">
      <q-input
        v-model="newPost.contributorCity"
        class="col col-sm-10 text-capitalize"
        :label="$t('create.contributorInfo')"
        filled
      />
    </div>

    <div>
      <h6 class="text-weight-light q-ma-sm text-capitalize">
        {{ $t('create.buildingInfo') }}
      </h6>
    </div>

    <div class=" q-ma-md">
      <q-input
        v-model="newPost.title"
        class="col col-sm-10 text-capitalize"
        :label="$t('create.buildTitle')"
        filled
      />
    </div>

    <div class="q-ma-md">
      <q-input
        v-model="newPost.details"
        filled
        autogrow
        class="col col-sm-10 text-capitalize"
        :label="$t('create.buildDetails')"
        type="textarea"
      />
    </div>

    <q-select
      class="q-ma-md text-capitalize"
      filled
      use-input
      :label="$t('create.buildCounty')"
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
            {{ $t('create.buildCountyNoResults') }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <div class="q-ma-md">
      <q-input
        :loading="locationLoading"
        v-model="location"
        class="col col-sm-10"
        :label="$t('create.buildLocation')"
        filled
        disable
      >
      </q-input>
      <q-btn-group flat spread class="q-mt-sm">
        <q-btn
          class="q-mr-sm text-uppercase"
          dense
          flat
          color="primary"
          icon="eva-pin-outline"
          :label="$t('create.pick')"
          @click="toggleShowLocationPickerDialog"
        />

        <q-btn
          dense
          flat
          class="text-uppercase"
          color="primary"
          icon="eva-navigation-2-outline"
          :label="$t('create.locate')"
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
        class="col col-sm-10 text-capitalize"
        :label="$t('create.buildPrevFunctions')"
        type="textarea"
      />
    </div>

    <div class="q-ma-md">
      <q-input
        v-model="newPost.stories"
        filled
        autogrow
        class="col col-sm-10 text-capitalize"
        :label="$t('create.buildRelevStories')"
        type="textarea"
      />
    </div>

    <div class="q-ma-md">
      <q-input
        v-model="newPost.suggestedFunctions"
        filled
        autogrow
        class="col col-sm-10 text-capitalize"
        :label="$t('create.buildSuggestFunctions')"
        type="textarea"
      />
    </div>

    <q-btn-toggle
      v-model="newPost.isRecovered"
      spread
      class="q-ma-sm q-mx-md text-grey-9 text-capitalize"
      no-caps
      unelevated
      toggle-color="primary"
      color="grey-4"
      text-color="grey-9"
      :options="[
        { label: $t('create.recovered'), value: true },
        { label: $t('create.needsRecovery'), value: false }
      ]"
    />

    <div class="q-ma-sm text-grey-9">
      <ImagePicker :postUid="newPost.uid"></ImagePicker>
    </div>

    <div class="q-ma-sm">
      <q-checkbox
        class="col col-sm-10"
        v-model="newPost.newsletterAgree"
        :label="$t('create.newsletter')"
      />
    </div>

    <div class="q-ma-sm">
      <q-checkbox class="col col-sm-10" v-model="tncAgree">
        {{ $t('create.agreeTC1') }}
        <q-btn dense flat unelevated label="T&C" @click="tcModal = true" />{{
          $t('create.agreeTC2')
        }}
      </q-checkbox>
    </div>

    <q-dialog v-model="tcModal">
      <TermsAndConditions />
    </q-dialog>

    <div class="row justify-center q-mt-lg">
      <q-btn
        unelevated
        color="primary"
        class="text-uppercase"
        :label="$t('create.submit')"
        @click="addPost"
        :disable="
          !newPost.contributorEmail ||
            !newPost.title ||
            !newPost.details ||
            !newPost.county ||
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
import LocationPickerDialog from 'components/new-post/LocationPickerDialog';
import ImagePicker from 'components/common/ImagePicker';
import TermsAndConditions from 'components/common/TermsAndConditions';

export default {
  name: 'PageCreatePost',

  components: {
    LocationPickerDialog,
    ImagePicker,
    TermsAndConditions
  },

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
      tcModal: false,
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

<style lang="scss" scoped>
.body--light {
  h4,
  h6,
  .q-checkbox {
    color: $grey-10 !important;
  }
}

.body--dark {
  h4,
  h6,
  .q-checkbox,
  .q-btn {
    color: $grey-13 !important;
  }
}
</style>

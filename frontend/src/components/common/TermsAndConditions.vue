<template>
  <q-card>
    <q-toolbar>
      <q-avatar rounded>
        <img src="lost-heritage.png" />
      </q-avatar>

      <q-toolbar-title class="text-weight-bold"> T & C </q-toolbar-title>

      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section class="text-justify">
      <p v-for="(p, index) in $t('termsandconditions.intro')" :key="index">
        {{ p }}
      </p>

      <div class="text-h6">{{ $t('termsandconditions.cookiesTitle') }}</div>

      <p v-for="(p, index) in $t('termsandconditions.cookiesP')" :key="index">
        {{ p }}
      </p>

      <div class="text-h6">{{ $t('termsandconditions.licenseTitle') }}</div>

      <p v-for="(p, index) in $t('termsandconditions.licenseP1')" :key="index">
        {{ p }}
      </p>

      <ul>
        <li
          v-for="(p, index) in $t('termsandconditions.licenseLi1')"
          :key="index"
        >
          {{ p }}
        </li>
      </ul>

      <p v-for="(p, index) in $t('termsandconditions.licenseP2')" :key="index">
        {{ p }}
      </p>

      <ul>
        <li
          v-for="(p, index) in $t('termsandconditions.licenseLi2')"
          :key="index"
        >
          {{ p }}
        </li>
      </ul>

      <p>
        {{ $t('termsandconditions.licenseP3') }}
      </p>

      <div class="text-h6">{{ $t('termsandconditions.hyperTitle') }}</div>

      <p>
        {{ $t('termsandconditions.hyperP1') }}
      </p>

      <ul>
        <li v-for="(p, index) in $t('termsandconditions.hyperLi')" :key="index">
          {{ p }}
        </li>
      </ul>

      <p>
        {{ $t('termsandconditions.hyperP2') }}
      </p>

      <div class="text-h6">{{ $t('termsandconditions.contentTitle') }}</div>

      <p>
        {{ $t('termsandconditions.content') }}
      </p>

      <div class="text-h6">{{ $t('termsandconditions.privacyTitle') }}</div>

      <p>{{ $t('termsandconditions.privacyP') }}</p>

      <div class="text-h6">{{ $t('termsandconditions.rightsTitle') }}</div>

      <p>
        {{ $t('termsandconditions.rights') }}
      </p>

      <div class="text-h6">{{ $t('termsandconditions.removalTitle') }}</div>

      <p v-for="(p, index) in $t('termsandconditions.removal')" :key="index">
        {{ p }}
      </p>

      <div class="text-h6">{{ $t('termsandconditions.disclaimer') }}</div>

      <p>
        {{ $t('termsandconditions.disclaimerP1') }}
      </p>

      <ul>
        <li
          v-for="(p, index) in $t('termsandconditions.disclaimerUl')"
          :key="index"
        >
          {{ p }}
        </li>
      </ul>

      <p
        v-for="(p, index) in $t('termsandconditions.disclaimerP2')"
        :key="index"
      >
        {{ p }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'TermsAndConditions',

  data() {
    return {};
  }
};
</script>

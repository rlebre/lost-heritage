<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions('posts', ['fetchPosts'])
  },
  mounted() {
    this.fetchPosts().then(
      data => {
        // this.$q.notify({
        //   message: 'Posts updated successfully.',
        //   timeout: 1000
        // });
      },
      errors => {
        this.$q.notify({
          message: errors[0].title,
          caption: errors[0].detail,
          timeout: 1000
        });
      }
    );
  }
});
</script>

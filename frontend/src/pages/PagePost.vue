<template>
  <q-page padding>
    <span>{{ id }}</span>
  </q-page>
</template>

<script>
export default {
  name: 'PagePost',

  data() {
    return {
      id: this.$route.params.id
    };
  }
};
</script>

<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <template v-if="!isLoadingPosts && postList.length">
        <div class="col-12" v-for="post in postList" :key="post.id">
          <template>
            <q-card class="card-post q-mb-md" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs col-7">
                  <div class="text-h5 q-mt-sm q-mb-lg text-weight-bold">
                    {{ post.title }}
                  </div>
                  <div class="text-caption text-grey-7 small-screen-only">
                    {{ post.details | str_limit(200) }}
                  </div>
                  <div class="text-caption text-grey-7 large-screen-only">
                    {{ post.details }}
                  </div>
                </q-card-section>

                <q-card-section class="col-5 flex flex-center">
                  <q-img
                    class="rounded-borders"
                    :src="post.imageUrls[0]"
                    style="height:100px"
                  />
                </q-card-section>
              </q-card-section>

              <!-- 
              <q-separator />
              
              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat>
                  7:30PM
                </q-btn>
                <q-btn flat color="primary">
                  Reserve
                </q-btn>
              </q-card-actions> -->
            </q-card>
          </template>
        </div>
      </template>
      <div class="col-12" v-else-if="!isLoadingPosts && !postList.length">
        <h5 class="text-center text-grey">No posts yet.</h5>
      </div>
      <div class="col-12" v-else>
        <q-card flat bordered>
          <q-card-section>
            <q-skeleton type="text" class="text-subtitle2" animation="fade" />
            <q-skeleton
              type="text"
              width="50%"
              class="text-subtitle2"
              animation="fade"
            />
          </q-card-section>

          <q-skeleton class="q-ma-sm" height="200px" animation="fade" />
        </q-card>
      </div>
      <!-- <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Rui Lebre</q-item-label>
            <q-item-label caption>
              @ruilebre
            </q-item-label>
          </q-item-section>
        </q-item>
      </div> -->
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import { mapGetters } from 'vuex';

export default {
  name: 'PageHome',

  computed: {
    ...mapGetters('posts', ['postList', 'isLoadingPosts'])
  },

  data() {
    return {};
  },

  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D, HH:mm');
    }
  }
};
</script>

<style lang="scss">
.card-post {
  .q-img {
    min-height: 200px;
  }
  .text-caption {
    font-size: 0.8rem;
  }
}
</style>

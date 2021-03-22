<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-12">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h4 q-mb-lg">Accept pending posts</div>
            <div class="text-body1">
              Here you can accept submitted posts that need revision from
              administrators.
            </div>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              size="18px"
              round
              flat
              color="primary"
              icon="eva-arrow-circle-right"
              to="/admin/pending-posts"
            >
              <q-tooltip>Navigate</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>

        <q-card class="my-card">
          <q-card-section>
            <div class="text-h4 q-mb-lg">Accept pending comments</div>
            <div class="text-body1">
              Here you can accept submitted comments that need revision from
              administrators.
            </div>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              size="18px"
              round
              flat
              color="primary"
              icon="eva-arrow-circle-right"
              to="/admin/pending-comments"
              disabled
            >
              <q-tooltip>Navigate</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 600px;
  margin: 10px auto;
}

.constrain {
  max-width: 850px;
  margin: 0 auto;
}
</style>

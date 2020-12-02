<template>
  <q-page
    class="window-height window-width row justify-center items-center bg-blue-1"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:485px;">
          <q-card-section class="bg-blue-8">
            <h4 class="text-h5 text-white q-my-md">Património Esquecido</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                square
                clearable
                v-model="email"
                type="email"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-section class="text-center q-pa-sm">
            <q-btn
              unelevated
              size="md"
              color="primary"
              class="btn btn-primary"
              label="Sign In"
              @click="onLoginClick()"
            />
          </q-card-section>

          <!-- <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'PageAuth',

  data() {
    return {
      email: '',
      password: ''
    };
  },

  methods: {
    ...mapActions('auth', ['login']),

    onLoginClick() {
      this.login({ email: this.email, password: this.password }).then(
        data => {
          this.$q.notify({
            message: 'Login Success',
            timeout: 5000
          });

          this.$router.push('/admin');
        },
        errors => {
          this.$q.notify({
            message: errors[0].title,
            caption: errors[0].detail,
            timeout: 5000
          });

          this.password = '';
        }
      );
    }
  }
};
</script>

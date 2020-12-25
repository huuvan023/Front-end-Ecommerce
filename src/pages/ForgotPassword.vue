<template>
  <div style="font-family: 'Actor'" class="q-pa-md row paper-wrap">
    <div class="col-lg-4 col-sm-8 ">
      <div @click="go('/')" class="cursor-pointer col-12 flex q-mb-md justify-center">
        <q-img src="logo.png" alt=""  style="width: 150px"/>
      </div>
      <q-card class="col-10 q-pa-md q-mx-auto">

            <div class="text-h6 col-12 text-center" style="font-weight: bold; ">ENTER YOUR EMAIL</div>

            <div class="text-h6 col-md-8 q-mx-auto">

              <q-input outlined class="q-pt-lg" color="dark" v-model="email" label="Email address">
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>

              <div class="flex justify-center q-mt-md">
                <q-btn @click="onLogin" outline color="primary" class="q-my-sm q-px-xl q-py-xs text-body1" label="Get new password" />
              </div>
            </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "SignUp",
  data () {
    return {
      email: ''
    }
  },
  mounted() {
  },
  watch: {
    notify() {
      if (this.notify) {
        this.$q.notify({
          color: this.notify.color,
          message: this.notify.message,
          position: 'top',
          icon: 'check_circle',
          timeout: 2000,
          actions: [
            { label: 'Close', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })

        this.$store.commit('notify/setNotify', null)
      }
    }
  },
  async created() {
    await this.handleFetchUser();
    if(this.isLogged) {
      this.$q.notify({
        color: 'positive',
        message: 'Login success!!',
        position: 'top-right',
        timeout: 1000
      })
      this.$router.replace('/')
      return;
    }
  },
  computed: {
    ...mapState(
      "notify", ['notify']
    ),
    ...mapState(
      'user', ['user', 'isLogged']
    )
  },
  methods: {
    ...mapActions({
      handleLogin: 'user/onLogin',
    }),
    ...mapActions({
      handleFetchUser: 'user/fetchUser',
      handleResetPassword: 'user/resetPassword'
    }),
    resetField() {
      this.password = '';
      this.confirmPassword = '';
      this.userName = '';
      this.fullName = '';
      this.isPwd = true;
      this.isConfirmPwd = true;
      this.rememberMe = true;
      this.termsOfUse = false;
    },
    go (url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
    async onLogin() {
      this.$q.loading.show({
        message: 'Sending....'
      })
      await this.handleResetPassword({
        email: this.email
      })
      this.$q.loading.hide()
    }
  }
}
</script>

<style scoped>
#header-login {
  font-family: 'Alatsi';
  font-weight: bold;
  text-align: center;
  color: blue;
}
.center-element {
  margin: 0 auto;
}
.other-auth {
  border: 2px solid lightgrey;
  cursor: pointer;
}
.other-auth:hover {
  background-color: #F0F0F0;
}
.paper-wrap {
  background-color: #EEEEEE;
  width: 100%;
  overflow: auto;
  position: fixed;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>

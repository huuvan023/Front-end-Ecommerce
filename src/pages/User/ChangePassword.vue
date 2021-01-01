<template>
  <div class="row col-12">
    <div class="col-md-11 col-xs-12 row q-mx-auto q-pa-md q-mb-md" style="border: 1px solid lightgrey">
      <div class="col-12">
        <q-icon name="vpn_key" size="lg"/>
      </div>
      <div class="text-h4 q-my-md text-weight-bold col-12">Change password</div>
       <p>
        Change your password to sercure your account.
      </p>
      <div class="col-8 row" style="font-family: Actor">
        <div class="col-12 q-my-sm">
          <div class="col-12 q-my-sm">
            <label class="text-weight-bold text-grey-7 text-h6">
              Your current password:
            </label>
            <q-input outlined class="q-pt-lg" color="dark" label="Current password" v-model="currPassword"
                      :type="isCurrPassword ? 'password' : 'text'">
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  v-if="currPassword!==''"
                  :name="isCurrPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isCurrPassword = !isCurrPassword"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-my-sm">
            <label class="text-weight-bold text-grey-7 text-h6">
              New password:
            </label>
            <q-input outlined class="q-pt-lg" color="dark" label="New password" v-model="newPassword"
                      :type="isNewPassword ? 'password' : 'text'">
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  v-if="newPassword!==''"
                  :name="isNewPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isNewPassword = !isNewPassword"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-my-sm">
            <label class="text-weight-bold text-grey-7 text-h6">
              Retype new password:
            </label>
            <q-input outlined class="q-pt-lg" color="dark" label="Retype new password" v-model="confirmPassword"
                      :type="idConfirmPassword ? 'password' : 'text'">
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  v-if="confirmPassword!==''"
                  :name="idConfirmPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="idConfirmPassword = !idConfirmPassword"
                />
              </template>
            </q-input>
          </div>
        </div>
        <div class="col-8 q-mt-sm q-mb-md">
          <q-btn color="dark" text-color="white"
                 @click="ChangePassword"
                 class="text-h6 text-weight-bold full-width" label="UPDATE PASSWORD"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import {mapActions, mapState} from "vuex";

export default {
  name: "ChangePassword",
  data: () => ({
    currPassword: '',
    newPassword: '',
    confirmPassword: '',
    isCurrPassword: true,
    isNewPassword: true,
    idConfirmPassword: true
  }),
  async mounted() {
  },
  methods: {
    ...mapActions({
      handleFetchUser: 'user/fetchUser',
      handleChangePassword: 'user/changePassword'
    }),
    async ChangePassword() {
      await this.$q.loading.show();
      if (this.confirmPassword.trim() !== this.newPassword.trim()) {
         this.$q.notify({
          color: 'negative',
          message: "New password and confirm password not match!",
          position: 'top',
          timeout: 2000,
          actions: [
            { label: 'Close', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
        await this.$q.loading.hide();
        return
      }
      if (this.newPassword.length < 6) {
         this.$q.notify({
          color: 'negative',
          message: "Password at least 6 character!",
          position: 'top',
          timeout: 2000,
          actions: [
            { label: 'Close', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
        await this.$q.loading.hide();
        return
      }
      const user = {
        avatar: this.currPassword,
        password: this.newPassword
      }
      await this.handleChangePassword(user);
      await this.$q.loading.hide();
    }
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
  computed: {
  ...mapState(
      'user', ['user', 'isLogged']
    ),
  ...mapState(
      "notify", ['notify']
    )
  }
}
</script>

<style scoped>

</style>

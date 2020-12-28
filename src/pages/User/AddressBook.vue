<template>
  <div class="row col-12">
    <div class="col-md-11 col-xs-12 row q-mx-auto q-pa-md q-mb-md" style="border: 1px solid lightgrey">
      <div class="col-12">
        <q-icon name="home" size="lg"/>
      </div>
      <div class="text-h4 q-my-md text-weight-bold col-12">Address Book</div>
      <div class="col-8 row" style="font-family: Actor">
        <div class="col-12 q-my-sm">
          <label class="text-weight-bold text-grey-7 text-h6">
             YOUR MOBILE:
          </label>
          <q-input class="col-12" outlined v-model="phoneNumber" color="dark" />
        </div>
        <div class="col-12 q-my-sm">
          <label class="text-weight-bold text-grey-7 text-h6">
            ADDRESS:
          </label>
          <q-input class="col-12" outlined v-model="address.mainAddress" color="dark" />
          <q-input class="col-12 q-mt-sm" outlined v-model="address.optionalNote" placeholder="Note (optional )" color="dark" />
        </div>
        <div class="col-12 q-my-sm">
          <label class="text-weight-bold text-grey-7 text-h6">
            CITY/PROVINCE:
          </label>
          <q-input class="col-12" outlined v-model="address.city" color="dark" />
        </div>
        <div class="col-12 q-my-sm">
          <p>This will be your default shipping address.</p>
        </div>
        <div class="col-8 q-mt-sm q-mb-md">
          <q-btn color="dark" text-color="white"
                 @click="updateUser"
                 class="text-h6 text-weight-bold full-width" label="SAVE CHANGES"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import {mapActions, mapState} from "vuex";

export default {
  name: "AddressBook",
  data: () => ({
    phoneNumber: '',
    address: {
      mainAddress: '',
      optionalNote: '',
      city:''
    }
  }),
  async mounted() {
    this.$q.loading.show();
    await this.handleFetchUser();
    this.phoneNumber = this.user.phoneNumber;
    this.address.mainAddress = this.user.address;
    this.address.optionalNote = this.user.note;
    this.address.city = this.user.province;
    this.$q.loading.hide();
  },
  methods: {
    ...mapActions({
      handleFetchUser: 'user/fetchUser',
      handleUpdateUser: 'user/updateUser'
    }),
    async updateUser() {
      await this.$q.loading.show();
      const user = {
        phoneNumber : this.phoneNumber,
        address : this.address.mainAddress,
        note: this.address.optionalNote,
        province: this.address.city
      }
      await this.handleUpdateUser(user);
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

  <template>
    <div class="row col-12">
      <div class="col-md-11 col-xs-12 row q-mx-auto q-pa-md q-mb-md" style="border: 1px solid lightgrey">
      <div class="col-12">
        <q-icon name="contacts" size="lg"/>
      </div>
      <div class="text-h4 q-my-md text-weight-bold">My details</div>
      <p>
        Feel free to edit any of your details below so your HCMUE Ecom account is totally up to date.
      </p>
      <div class="col-8 row" style="font-family: Actor">
        <div class="col-12 q-my-sm">
          <label class="text-weight-bold text-grey-7 text-h6">
            FIRST NAME:
          </label>
          <q-input class="col-12" outlined v-model="firstName" color="dark" />
        </div>
        <div class="col-12 q-my-sm">
          <label class="text-weight-bold text-grey-7 text-h6">
            LAST NAME:
          </label>
          <q-input class="col-12" outlined v-model="lastName" color="dark" />
        </div>
        <div class="col-12 q-my-sm">
          <label class="text-weight-bold text-grey-7 text-h6">
            EMAIL ADDRESS:
          </label>
          <q-input class="col-12" outlined v-model="emailAddress" color="dark" />
        </div>
        <div class="col-12 q-my-sm">
          <label class="text-weight-bold text-grey-7 text-h6">
            DATE OF BIRTH:
          </label>
          <q-input v-model="dateOfBirth" outlined type="date" />
        </div>
        <div class="col-12 q-my-sm">
          <label class="text-weight-bold text-grey-7 text-h6">
            MOSTLY INTERESTED IN:
          </label>
          <div class="col-12 row">
            <q-radio v-model="interestedIn" color="dark" val="womenswear" label="Womenswear" />
            <q-separator vertical inset class="q-mx-md"/>
            <q-radio v-model="interestedIn" color="dark" val="menswear" label="Menswear" />
          </div>
        </div>
        <div class="col-8 q-my-md">
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
  name: "MyDetails",
  data:() => ({
    firstName: null,
    lastName: null,
    emailAddress: null,
    dateOfBirth: null,
    interestedIn: ''
  }),
  methods: {
    ...mapActions({
      handleFetchUser: 'user/fetchUser',
      handleUpdateUser: 'user/updateUser'
    }),
    formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    },
    async updateUser() {
      this.$q.loading.show();
      const user = {
        email : this.emailAddress,
        firstName : this.firstName,
        lastName: this.lastName,
        birthday : this.dateOfBirth.toString(),
        interestedIn : this.interestedIn
      }
      await this.handleUpdateUser(user);
      this.$q.loading.hide()
    }
  },
  async mounted() {
    this.$q.loading.show();
    await this.handleFetchUser();
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.emailAddress = this.user.email;
    this.dateOfBirth = this.formatDate(this.user.birthday);
    this.interestedIn = this.user.interestedIn;
    this.$q.loading.hide();
  },
  computed: {
    ...mapState(
      'user', ['user', 'isLogged']
    ),
    ...mapState(
      "notify", ['notify']
    )
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
  }
}
</script>

<style scoped>

</style>

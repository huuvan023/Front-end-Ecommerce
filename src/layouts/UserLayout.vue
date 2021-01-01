<template>
  <div class="row col-12">
    <div class="col-11 row q-mx-auto q-mb-md">
      <q-breadcrumbs class="col-12 q-my-md-md q-my-xs-sm">
        <q-breadcrumbs-el to="/" label="Home" />
        <q-breadcrumbs-el :label="this.labelBread" />
      </q-breadcrumbs>
      <q-separator/>
    </div>
    <div class="col-lg-8 col-md-10 col-xs-12 q-mt-sm q-pa-sm row q-mx-auto q-mb-xl ">
      <div class="col-md-4 col-sm-10 q-mx-sm-auto q-mx-md-none col-xs-12">
        <q-list bordered class="flex items-center q-py-lg q-pl-sm">
          <input type="file" style="display: none" accept="image/*" @change="uploadImage" ref="uploadAvatar">
          <q-avatar size="100px" font-size="40px" color="dark"
                    class="cursor-pointer wrap-icon-upload relative-position text-weight-bold"
                    text-color="white" @click="uploadAvatar" >
            {{!user.avatar ? labelDisplay : null }}
            <q-tooltip>
              Upload new avatar
            </q-tooltip>
            <img v-if="user.avatar" :src="user.avatar"/>
          </q-avatar>
          <div class="q-ml-md">
            <div>Hi,</div>
            <div class="text-h6 text-weight-bold">{{labelBread}}</div>
          </div>
        </q-list>

        <div class="q-mt-md non-selectable">
          <q-list bordered>


            <UserTabItem v-for="(item,index) in userTabList"
                     @goURL = "go"
                     :key="index" :data = "item" :userTabCurrent="userTabCurrent"/>
          </q-list>
        </div>
        <div class="q-my-md non-selectable">
          <q-list bordered>
            <q-item @click="confirmLogout = !confirmLogout" clickable v-ripple>
              <div class="q-ma-xs flex">
                <q-item-section avatar>
                  <q-avatar color="dark" text-color="white" icon="login" />
                </q-item-section>
                <q-item-section>Log out</q-item-section>
                <q-dialog v-model="confirmLogout" persistent>
                  <q-card>
                    <q-card-section class="row items-center">
                      <q-avatar icon="exit_to_app" color="primary" text-color="white" />
                      <span class="q-ml-sm">You really want to log out?</span>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="Cancel" color="primary" v-close-popup />
                      <q-btn flat label="Yes! Sure!" @click="onnlogOut" color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </div>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="col-md-8 col-xs-12 col-sm-10 q-mx-sm-auto q-mx-md-none">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import UserTabItem from "components/UserTabItem";
import {httpClient} from "src/config/httpClient";
import {mapActions, mapState} from "vuex";
import axios from "axios";

export default {
  name: "UserLayout",
  components: {UserTabItem},
  data:() => ({
    cloudinaryURL: "https://api.cloudinary.com/v1_1/huuvan/upload",
    cloudUploadPreset: 'vue-upload',
    labelDisplay: "",
    userTabCurrent: '',
    labelBread: "",
    confirmLogout: false,
    imageUrl: '',
    userTabList: [
      {
        userTabCheck: '/user',
        icon: 'person',
        text: 'Account overview',
        active: false
      },
    
      {
        userTabCheck: '/user/my-details',
        icon: 'contacts',
        text: 'My details',
        active: false
      },
      {
        userTabCheck: '/user/my-orders',
        icon: 'local_shipping',
        text: 'My orders',
        active: false
      },
      {
        userTabCheck: '/user/address-book',
        icon: 'home',
        text: 'Address book',
        active: false
      },
      {
        userTabCheck: '/user/gift-and-vouchers',
        icon: 'redeem',
        text: 'Gift and Vouchers',
        active: false
      },
      {
        userTabCheck: '/user/change-password',
        icon: 'vpn_key',
        text: 'Change password',
        active: false
      }
    ]
  }),
  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/image/upload`
    },
    ...mapState(
      'user', ['user', 'isLogged']
    ),
    ...mapState(
      "notify", ['notify']
    )
  },
  created() {
      /*{
        userTabCheck: '/user/my-orders',
        icon: 'local_shipping',
        text: 'My orders',
        active: false
      },*/
    this.userTabCurrent = this.$route.path
    this.userTabList = this.userTabList.map(item => {
      if (this.userTabCurrent === item.userTabCheck) {
        item.active = true
      } else {
        item.active = false
      }
      return item
    })
  },
  async mounted() {
    this.$q.loading.show()
    await this.handleFetchUser();
    this.labelDisplay = `${(this.user.firstName).charAt(0)}${(this.user.lastName).charAt(0)}`;
    this.labelBread = `${this.user.firstName} ${this.user.lastName}`;
    if (localStorage.getItem('favourite')) {
      this.$store.commit('product/setFavouriteItem', JSON.parse(localStorage.getItem('favourite')).length)
    }
    this.$q.loading.hide();
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
  methods: {
    ...mapActions({ 
      handleFetchUser: 'user/fetchUser',
      handleUpdateUser: 'user/updateUser'
    }),
    uploadAvatar() {
      this.$refs.uploadAvatar.click();
    },
    async uploadImage (event) {
      this.$q.loading.show();
      const files = event.target.files
      let filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      //
      const formData = new FormData()
      formData.append('file', files[0]);
      formData.append('upload_preset', this.cloudUploadPreset);
      formData.append('tags', 'gs-vue,gs-vue-uploaded');
      await axios({
        url: this.cloudinaryURL,
        method: "POST",
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*"
        },
        data: formData
      })
      .then( data => {
        const user = {
          avatar: data.data.secure_url
        }
        this.$store.commit('user/setAvatar', data.data.secure_url)
        return this.handleUpdateUser(user);
      })
      this.$q.loading.hide();
    },
    go (url) {
      this.userTabList = this.userTabList.map(item => {
        if (url === item.userTabCheck) {
          item.active = true
        } else {
          item.active = false
        }
        return item
      })
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
    async onnlogOut() {
      localStorage.removeItem('tokenString');
      this.$q.notify({
        message: 'Logout success!',
        position: 'top',
        color: 'positive',
        actions: [
          { label: 'Close', color: 'yellow', handler: () => { /* ... */ } }
        ]
      })
      await this.$store.commit('user/setUser', null)
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.active-tab {
  border-right: 5px solid black;
}
.icon-upload {
  display: none;
  opacity: 0.5;
}
.wrap-icon-upload:hover {
  opacity: 1;
}
.wrap-icon-upload{
  transition: .4s;
}
.wrap-icon-upload:hover .icon-upload {
  display: block;
}
</style>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="absolute-top full-width row bg-white">
      <div class="full-width row bg-dark text-white q-py-xs">
        <div class="col-11 q-mx-auto flex">
          <div class="flex items-center">
            <q-icon name="phone_in_talk" class="q-mr-sm" color="white" size="sm"/>
            <div class="text-subtitle2">Call: +84372746758</div>
          </div>
          <div class="flex items-center q-ml-auto">
            <div class="text-white flex items-center q-ml-md">
              <q-btn icon="language" round color="dark" >
                <q-menu
                  content-class="bg-dark text-white"
                  transition-show="jump-down"
                  transition-hide="jump-up"
                >
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Tiếng Việt</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable>
                      <q-item-section>English</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <div>
                Language
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-toolbar class="row no-padding full-width">
        <q-toolbar-title class="col-11 row q-mx-auto q-py-md flex items-center justify-between">
          <div @click="go('/')" class="cursor-pointer logo q-mx-xs-auto q-mx-sm-none">
            <img class="full-width full-height" alt="logo" src="logo.png">
          </div>
          <div class="text-black q-mx-auto q-my-xs-md q-my-sm-none">
            <q-input rounded outlined v-model="searchKey" color="dark" style="min-width: 30vw" placeholder="Search product" :dense="dense">
              <template v-slot:append>
                <q-icon v-if="searchKey.length > 0"
                        style="cursor: pointer"
                        @click="searchKey=''"
                        transition-show="jump-down"
                        transition-hide="jump-up" name="clear" />
              </template>

              <template v-slot:after>
                <q-btn size="lg" round dense flat icon="search" />
              </template>
            </q-input>
          </div>

          <div class="row text-black q-mt-xs-md q-mt-md-none q-mx-xs-auto q-mx-md-none">
            <div class="col-12 row q-mb-sm">
              <div class="q-ml-md-auto q-mx-xs-auto q-mx-md-none flex justify-lg-end">
                <q-btn @click="go('/favourite-item')" outline round color="dark" class="q-mr-sm" icon="favorite_border">
                  <q-badge color="red" text-color="white"  floating>2</q-badge>
                  <q-tooltip anchor="center right" self="center left">
                    Favourite items
                  </q-tooltip>
                </q-btn>
                <q-btn outline round @click="go('/cart')" color="dark" class="q-ml-lg q-mr-sm" icon="shopping_cart">
                  <q-badge color="red" text-color="white"  floating>2</q-badge>
                  <q-tooltip content-class=" " anchor="center right" self="center left">
                    Your cart
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class="col-12 row text-right full-width">
              <div v-if="!logged" @click="go('/login')" class="q-ml-md-auto q-mx-xs-auto q-mx-md-none flex justify-lg-end">
                <div class="q-mr-sm authBtn">Login</div>
                <div>|</div>
                <div class="q-ml-sm authBtn">Sign up</div>
              </div>
              <div v-if="logged" @click="go('/user')"
                   class="non-selectable authBtn q-ml-md-auto q-mx-xs-auto q-mx-md-none flex items-center justify-lg-end">
                <q-icon class="q-mr-sm" size="md" name="account_circle"/>
                <div>{{user.lastName}}</div>
              </div>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <div class="row col-11 q-mx-auto text-black">
        <q-tabs
          v-model="tab"
          inline-label
          align="justify"
          class="bg-blue-grey-1 full-width text-black AlefFont"
        >
            <div class="flex q-mr-auto">
              <q-tab  class="q-px-md" name="/" @click="go('/')"  label="HOME" />
              <q-tab label="MEN" name="/men-products" class="q-px-md" >
                <q-menu
                  class="full-width"
                  transition-show="jump-down"
                  transition-hide="jump-up"
                >
                  <div @click="go('/men-products')" class="flex q-pa-md justify-center main-title text-h6 link-rt text-weight-bold items-center">
                    MEN FASHION
                  </div>
                  <q-separator class="q-mb-md" inset/>
                  <div class="flex q-mx-sm justify-center">
                    <div class="col-12 row" style="width: 400px">
                      <div v-for="item in this.cate" @click="go(`/men-products/${item.idCategory}`)" class="link-rt col-4 text-center">
                        {{item.categoryName}}
                      </div>
                    </div>
                  <div class="full-width q-mt-md">
                    <q-separator  inset/>
                    <div @click="go('/men-products')" class="q-my-sm text-center text-subtitle2 link-rt text-weight-bold">See all...</div>
                  </div>
                  </div>
                </q-menu>
              </q-tab>
              <q-tab label="WOMEN" name="/women-products" class="q-px-md" >
                <q-menu
                  class="full-width"
                  transition-show="jump-down"
                  transition-hide="jump-up"
                >
                  <div @click="go('/women-products')" class="flex q-pa-md justify-center main-title text-h6 link-rt text-weight-bold items-center">
                    WOMEN FASHION
                  </div>
                  <q-separator class="q-mb-md" inset/>
                  <div class="flex q-mx-sm justify-center">
                    <div class="col-12 row" style="width: 400px">
                      <div v-for="item in this.cate" @click="go(`/women-products/${item.idCategory}`)" class="link-rt col-4 text-center">
                        {{item.categoryName}}
                      </div>
                    </div>
                    <div class="full-width q-mt-md">
                      <q-separator  inset/>
                      <div @click="go('/women-products')" class="q-my-sm text-center text-subtitle2 link-rt text-weight-bold">See all...</div>
                    </div>
                  </div>
                </q-menu>
              </q-tab>
              <q-tab @click="go('/bags-n-purses')" label="BAGS & PURSES" name="/bags-n-purses" class="q-px-md" >
              </q-tab>
            </div>

          <div class="flex">
            <q-tab name="contact" class="q-px-md" label="CONTACT"/>
            <q-tab name="about-us" class="q-px-md" label="ABOUT US"/>
          </div>
        </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  <div class="col-12 row q-mb-md">
    <div class="row col-12 q-pb-xl q-pb-xs-none">
      <div class="col-2">
        <q-img src="/galleries/insta-1.jpg" class="full-width"/>
      </div>
      <div class="col-2">
        <q-img src="/galleries/insta-2.jpg" class="full-width"/>
      </div>
      <div class="col-2">
        <q-img src="/galleries/insta-3.jpg" class="full-width"/>
      </div>
      <div class="col-2">
        <q-img src="/galleries/insta-4.jpg" class="full-width"/>
      </div>
      <div class="col-2">
        <q-img src="/galleries/insta-5.jpg" class="full-width"/>
      </div>
      <div class="col-2">
        <q-img src="/galleries/insta-6.jpg" class="full-width"/>
      </div>
    </div>
    <div style="font-family: Actor" class="col-11 q-my-md q-mx-auto row">
      <div class="col-sm-3 col-xs-12 q-mx-auto q-my-sm-none q-my-xs-sm text-center">
        <div style="font-family: Architects Daughter"
             class="text-h5 q-mb-sm-md text-weight-bold ">HCMUE Ecommerce</div>
        <div class="text-subtitle1">
          Serving customers is our pleasure
        </div>
      </div>
      <div class="col-sm-3 col-xs-6 text-center">
        <div class="text-h5 q-mb-md text-weight-bold">
          Quick link
        </div>
        <div class="text-subtitle1">
          About
        </div>
        <div class="text-subtitle1">
          Blogs
        </div>
        <div class="text-subtitle1">
          Contact
        </div>
        <div class="text-subtitle1">
          FAQ
        </div>
      </div>
      <div class="col-sm-3 col-xs-6 text-center">
        <div class="text-h5 q-mb-md text-weight-bold">
          Other content
        </div>
        <div class="text-subtitle1">
          Term of use
        </div>
        <div class="text-subtitle1">
          Security payment
        </div>
        <div class="text-subtitle1">
          Transport require
        </div>
      </div>
      <div class="col-sm-3 col-xs-12 text-center">
        <div class="text-h5 q-mb-sm-md q-mb-xs-sm text-weight-bold">
          Subscribe to receive news from us
        </div>
        <div class="q-mb-md">
          <q-input outlined color="black" rounded v-model="subscribe" placeholder="Your email">
            <template v-slot:append>
              <q-btn style="background: red; color: white" rounded label="Subscribe" />
            </template>
          </q-input>
        </div>
        <div>
          <q-btn round size="md" class="q-mx-xs" color="grey-4">
            <i class="text-dark fab fa-facebook-f"></i>
          </q-btn>
          <q-btn round size="md" class="q-mx-xs" color="grey-4">
            <i class="text-dark fab fa-twitter"></i>
          </q-btn>
          <q-btn round size="md" class="q-mx-xs" color="grey-4">
            <i class="text-dark fab fa-youtube"></i>
          </q-btn>
          <q-btn round size="md" class="q-mx-xs" color="grey-4">
            <i class="text-dark fab fa-instagram"></i>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  </q-layout>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import {mapActions, mapState} from "vuex";
import {httpClient} from "src/config/httpClient";

export default {
  name: 'MainLayout',
  data () {
    return {
      darkMode: false,
      dense: false,
      searchKey: "",
      tab: '/',
      subscribe:'',
      logged: false,
      userData: {},
      type : [],
      cate: [],
      brand: [],
      color: [],
      size: []
    }
  },
  async created() {
   // console.log(this.$router.currentRoute.path)
    this.tab = this.$router.currentRoute.path
    //console.log(this.tab)
  },
  computed: {
    ...mapState(
      'user', ['user','isLogged']
    )
  },
  async mounted() {
    this.$q.loading.show()
    await this.handleFetchUser()
    await this.handleFetchAllCate();
    await this.handleFetchAllType();
    await this.handleFetchAllBrand();
    await this.handleFetchAllColor();
    await this.handleFetchAllSize();
    this.size = JSON.parse(localStorage.getItem('size'));
    this.type = JSON.parse(localStorage.getItem('type'));
    this.brand = JSON.parse(localStorage.getItem('brand'));
    this.color = JSON.parse(localStorage.getItem('color'));
    this.cate = JSON.parse(localStorage.getItem('category'));
    this.logged = this.isLogged;
    if(localStorage.getItem('tokenString')) {
      await httpClient.get("/api/user/infor")
        .then(data => {
          if (data.code === 1) {
            var udata = data.data;
            localStorage.setItem('user',JSON.stringify(udata));
            this.userData = data.data;
            this.logged = true;
          }
          else {
            this.logged = false
          }
        })
      .catch(e => {
        this.logged = false
        this.$q.notify({
          color: 'negative',
          message: 'Some thing went wrong!',
          position: 'top-right',
          timeout: 1000
        })
        return;
      })
    }
    else {
      this.logged = false
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
      handleLogout: 'user/logOut',
      handleFetchUser: 'user/fetchUser',
      handleFetchAllCate: 'main/fetchAllCate',
      handleFetchAllType: 'main/fetchAllType',
      handleFetchAllSize: 'main/fetchAllSize',
      handleFetchAllColor: 'main/fetchAllColor',
      handleFetchAllBrand: 'main/fetchAllBrand',
    }),
    go (url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
  },
}
</script>
<style scoped>
.logo {
  width: 220px;
  height: 80px;
}
.authBtn:hover {
  color: grey;
  cursor: pointer;
  transition: 1s;
}
.AlefFont {
  font-family: Alata;
  box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.2);
}
.main-title {
  font-family: Actor;
}
.link-rt {
  cursor: pointer;
  user-select: none;
}
.link-rt:hover {
  color: red;
}
</style>

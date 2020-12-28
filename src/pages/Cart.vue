<template>
  <div class="row col-12">
    <div class="col-11 row q-mx-auto q-mb-md">
      <q-breadcrumbs class="col-12 q-my-md-md q-my-xs-sm">
        <q-breadcrumbs-el to="/" label="Home" />
        <q-breadcrumbs-el label="Cart" />
      </q-breadcrumbs>
      <q-separator/>
    </div>
    <div class="col-md-8 row q-mx-auto q-mb-xl">
      <div :class="data.length > 0 ? 'col-md-8 col-sm-8 q-mx-auto q-pa-sm' : 'col-md-12 col-sm-12 q-mx-auto q-pa-sm'">
        <div class="col-12 q-mx-xs q-pa-md shadow-1 overflow-auto">
          <div class="text-h6 q-my-md text-weight-bold col-12">YOUR CART</div>
          <div v-if="data.length < 1" class="text-weight-bolder text-subtitle2 flex justify-center">
            <div class="col-md-11 col-xs-12 q-mx-auto q-pa-md q-mb-md text-center"
                 style="font-family: Actor" >
              <div>
                <q-icon name="shopping_cart" size="lg"/>
              </div>
              <div class="text-uppercase text-weight-bold text-subtitle1">You currently have no item in your cart</div>
              <p class="q-my-md">
                Click button below to continue shopping…
              </p>
              <div class="col-12 row q-my-md">
                <div class="col-8 q-mx-auto ">
                  <q-btn color="dark" text-color="white"
                         @click="go('/')"
                         class="text-h6 text-weight-bold full-width" label="START SHOPPING"/>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item,key) in data" :key="key" >
            <q-separator/>
            <CardProductCart v-if="data.length > 0" :product="item" @delCart ="delCart" @editQuan="editQuanlity"/>
          </div>
        </div>
      </div>
      <div v-if="data.length > 0"  class="col-md-4 col-sm-8 q-mx-auto q-pa-sm">
        <div class="col-12 q-mx-xs q-pa-md shadow-1 overflow-auto">
          <div class="text-h6 text-weight-bold col-12">TOTAL</div>
          <q-separator class="q-my-md"/>
          <div class="col-12 q-my-xs flex items-center">
            <div class="text-subtitle1 text-weight-bold">Sub-total</div>
            <div class="q-ml-auto text-h6 text-blue-grey-8">${{ price }}</div>
          </div>
          <div class="col-12 q-mt-md flex items-center">
            <div class="text-subtitle1 text-weight-bold">Delivery</div>
            <q-icon class="q-ml-auto cursor-pointer text-blue-grey-8" size="sm" name="help_outline">
              <q-tooltip>
                Your delivery cost will base on delivery method your selected
              </q-tooltip>
            </q-icon>
          </div>
          <q-select class="q-mb-md no-padding no-margin text-blue-grey-8 col-12"
                    @input="changeDeliOpt"
                    v-model="delivery" :options="deliveryOpt" />
          <div class="col-12 q-mt-md">
            <div class="q-my-sm col-12">
              <label class="text-subtitle1 text-weight-bolder">Voucher<span class="text-subtitle2"> (Optional)</span></label>
              <div class="col-12 row">
                <q-input class="col-8" outlined v-model="voucher" color="dark" placeholder="XXX XXX"/>
                <div class="col-3 flex items-center">
                  <q-btn label="Apply" @click="validateVoucher" class="q-mx-sm" color="dark"/>
                </div>
              </div>
            </div>
          </div>
          <q-btn @click="openCheckoutModel"
                 class="q-mt-md full-width text-weight-bold text-white bg-green-9 q-py-xs"
                 style="font-family: Actor" label="CHECK OUT" />
          <q-dialog v-model="toLogin" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="clear" color="dark" text-color="white" />
                <span class="q-ml-sm">You are not authenticated, login now?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Login" @click="go('/login')" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="openModalPayment" full-width position="top">
            <Pay @Finish="Finish" :delivery="delivery" @closeModal="openModalPayment = false" :dialog="openModalPayment" />
          </q-dialog>
          <div class="col-12 q-mt-sm text-blue-grey-8">
            Got a discount code? Add to the box above.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import CardProductCart from "components/CardProductCart";
import Pay from "components/Pay";
import {mapActions, mapState} from "vuex";
import {httpClient} from "src/config/httpClient";

export default {
  name: "Cart",
  data() {
    return {
      toLogin: false,
      voucher: '',
      deliveryOpt: [
        {
          label: 'Normal Delivery ($15.00)',
          value: 'Normal'
        },
        {
          label: 'Express Delivery ($30.00)',
          value: 'Express'
        }
      ],
      delivery: {
        label: 'Normal Delivery ($15.00)',
        value: 'Normal'
      },
      openModalPayment: false,
      data: [],
      price: 0
    }
  },
  components: {CardProductCart,Pay},
  async mounted() {
    await this.fetch();
    await this.caculatePrice();
  },
  computed: {
    ...mapState(
      'user', ['user','isLogged']
    )
  },
  methods: {
    ...mapActions({
      handleFetchUser: 'user/fetchUser'
    }),
    async caculatePrice() {
      this.price = 0;
      var deliPrice = 0;
      if (this.delivery.value === 'Normal') {
        deliPrice = 15;
      }
      if (this.delivery.value === 'Express') {
        deliPrice = 30;
      }
      this.data.map(item => {
        if (item.isSaling > 0) {
          this.price += item.salePrice * item.quanlity
        }else {
          this.price += item.price * item.quanlity
        }
      })
      this.price += deliPrice
    },
    async changeDeliOpt() {
      await this.caculatePrice()
    },
    async Finish() {
      this.$q.loading.show()
      let proList = []
      for (let  i = 0; i< this.data.length; i++) {
        proList.push({
          idProduct: this.data[i].idProduct,
          quanlity: this.data[i].quanlity
        })
      }

      const addCheckout = {
        totalPrice: `${this.price}`,
        products: proList
      }

      await httpClient.post('api/checkout/add',addCheckout)
      .then(async data => {
        if(data.code === 1) {
          this.$q.notify({
            color: 'positive',
            message: 'Checkout success!',
            position: 'top',
            timeout: 1000
          })
          this.$q.loading.hide()

          sessionStorage.removeItem('cart')
          this.data = []
          this.$store.commit('product/setCartItem',0)
          return
        }
        else {
          this.$q.notify({
            color: 'negative',
            message: 'Checkout fail!',
            position: 'top',
            timeout: 1000
          })
          this.$q.loading.hide()
          this.openModalPayment = false
          return;
        }
      })
      .then(() => {
        this.openModalPayment = false
        return
      })
      this.$q.loading.hide()
    },
    async validateVoucher() {
      await httpClient.post("/api/voucher/get-voucher", {
        idVoucher: this.voucher
      })
      .then(data => {
        console.log(data)
        if (data.code === 1) {
          if (data.data.isUse !== 1) {
            this.$q.notify({
              color: 'positive',
              message: 'Voucher valid!',
              position: 'top',
              timeout: 1000
            })
            this.price = this.price - data.data.price
            this.$q.loading.hide()
            return true
          }
          else {
            this.$q.notify({
              color: 'negative',
              message: 'Voucher invalid!',
              position: 'top',
              timeout: 1000
            })
            this.$q.loading.hide()
            return false
          }
        }
        else {
          this.$q.notify({
            color: 'negative',
            message: 'Voucher invalid!',
            position: 'top',
            timeout: 1000
          })
          this.$q.loading.hide()
          return false
        }
      })
    },
    async openCheckoutModel() {
      await this.$q.loading.show()
      await this.handleFetchUser()
      if (!this.isLogged) {
        // this.$q.notify({
        //   color: 'negative',
        //   message: 'You must be login before checkout!',
        //   position: 'top',
        //   icon: 'check_circle',
        //   timeout: 2000,
        //   actions: [
        //     { label: 'Close', color: 'yellow', handler: () => { /* ... */ } }
        //   ]
        // })
        this.$q.loading.hide()
        this.toLogin = !this.toLogin;
        return
      }
      else {
        this.openModalPayment = !this.openModalPayment
        await this.$q.loading.hide()
        return
      }
    },
    fetch() {
      if (sessionStorage.getItem('cart')) {
        this.data = JSON.parse(sessionStorage.getItem('cart'));
      }
    },
    async delCart(product){
      let dt = JSON.parse(sessionStorage.getItem('cart'))
      let x = dt.filter(item => {
        return item.idProduct !== product.product.idProduct
      })
      sessionStorage.setItem('cart', JSON.stringify(x))
      await this.fetch()
      await this.caculatePrice()
      if (sessionStorage.getItem('cart')) {
        this.$store.commit('product/setCartItem', JSON.parse(sessionStorage.getItem('cart')).length)
      }
    },
    go (url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
    async editQuanlity(type) {
      if (type.type === 'sub') {
        if (type.product.quanlity > 1) {
          var session = JSON.parse(sessionStorage.getItem('cart')).map(item => {
            let qlt = item.quanlity;
            if(item.idProduct === type.product.idProduct) {
              qlt --;
            }
            return {...item, quanlity: qlt}
          })
          sessionStorage.setItem('cart', JSON.stringify(session))
          await this.fetch()
          await this.caculatePrice()
        }
      }
      if (type.type === 'add') {
        if (type.product.quanlity < 30) {
          var session = JSON.parse(sessionStorage.getItem('cart')).map(item => {
            let qlt = item.quanlity;
            if(item.idProduct === type.product.idProduct) {
              qlt ++;
            }
            return {...item, quanlity: qlt}
          })
          sessionStorage.setItem('cart', JSON.stringify(session))
          await this.fetch()
          await this.caculatePrice()
        }
      }
    }
  }
}
</script>

<style scoped>
.numMod {
  user-select: none;
  padding: 0 12px;
  cursor: pointer;
  border: 1px solid grey;
}
.numMod:hover {
  background-color: #EEEEEE;
}
</style>

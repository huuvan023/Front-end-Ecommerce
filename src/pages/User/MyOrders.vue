<template>
  <div class="row col-12">
    <div class="col-md-11 col-xs-12 row q-mx-auto q-pa-md q-mb-md" style="border: 1px solid lightgrey">
      <div class="col-12">
        <q-icon name="local_shipping" size="lg"/>
      </div>
      <div class="text-h4 q-my-md text-weight-bold">MY ORDERS</div>
    </div>
    <div v-if="data.length > 0"
         style="font-family: Actor;border: 1px solid lightgrey"
         class="col-md-11 col-xs-12 q-mx-auto q-pa-md q-mb-md text-center">
          <ListCheckout :date="item.date" :totalPrice="item.totalPrice" :status="item.status" v-for="(item, key) in data" :key="key" :checkout="item"/>
    </div>
    <div v-if="data.length <= 0" class="col-md-11 col-xs-12 q-mx-auto q-pa-md q-mb-md text-center"
         style="font-family: Actor;border: 1px solid lightgrey" >
      <div>
        <q-icon name="local_shipping" size="lg"/>
      </div>
      <div class="text-uppercase text-weight-bold text-subtitle1">You currently have no orders</div>
      <p class="q-my-md">
        Best get shopping HCMUE Ecommerce pronto…
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
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import {httpClient} from "src/config/httpClient";
import ListCheckout from "components/ListCheckout";

export default {
  name: "MyOrders",
  components: {ListCheckout},
  data:() => ({
    data:[]
  }),
  methods: {
    go(url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
  },
  async mounted() {
    let dt = []
    await httpClient.get('/api/user/get-user-checkout')
    .then(data => {
      if (data.code === 1) {
        dt = data.data;
      }
    })
    this.data = dt;
  }
}
</script>

<style scoped>

</style>

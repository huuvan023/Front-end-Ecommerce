<template>
  <div class="full-width shadow-2 q-my-md row q-pa-sm">
    <div class="col-8">
      <div v-for="(item) in arrProduct" class="text-left text-subtitle1">
        <div class="flex">
          <div>
            <q-img :src="item.photoReview" style="width: 50px;"/>
          </div>
          <div>
            <div>
              {{ item.productName }}
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="col-4 flex items-center">
        <div class="text-weight-bolder">
          Status: {{status}}
        </div>
    </div>
  </div>
</template>

<script>
import {httpClient} from "src/config/httpClient";

export default {
  name: "ListCheckout",
  props: {
    checkout: {
      require: true,
      type: Object
    }
  },
  data:() => ({
    status: "",
    data: {},
    arrProduct: [],
  }),
  async mounted() {
    let id = this.checkout.idOder;
    let dt = {}
    await  httpClient.post('/api/checkout/details', {
      idOder: id
    })
    .then(data => {
      dt = data.data
    })
    this.data = dt
    console.log(this.data)
    let ppp = []
    for (let i =0 ; i< this.data.products.length; i++) {
      let ii = this.data.products[i].idProduct
      await httpClient.post('/api/product/find-by-id', {
        idProduct: ii
      })
      .then(data => {
        ppp.push(data.data)
      })
    }
    this.arrProduct = ppp;
    console.log(this.data)
    if(this.data.status === 0) {
      this.status = "Initial"
    }
    if(this.data.status === 1) {
      this.status = "Receive"
    }
    if(this.data.status === 2) {
      this.status = "Delivery"
    }
    if(this.data.status === 3) {
      this.status = "Complete"
    }
  }
}
</script>

<style scoped>

</style>

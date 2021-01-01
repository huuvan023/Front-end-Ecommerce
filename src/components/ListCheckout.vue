<template>
  <div class="full-width shadow-2 q-my-md row q-pa-sm">
    <div class="col-8">
      <ProductInCheckOut v-for="(item,key) in data" :product="item" :key="key"/>
    </div>
    <div class="col-4 flex text-left q-pl-md row">
        <div class=" col-12">
          <span class="text-weight-bold">
            Status:
          </span> {{statuss}}
        </div>
        <div class="col-12">
          <span class="text-weight-bold">
            Date added:
          </span> {{date}}
        </div>
        <div class="col-12">
          <span class="text-weight-bold">
            Total price:
          </span>
          <span class=" text-subtitle1">
          {{totalPrice}} $
          </span>
        </div>
    </div>
  </div>
</template>

<script>
import {httpClient} from "src/config/httpClient";
import ProductInCheckOut from "components/ProductInCheckOut";

export default {
  name: "ListCheckout",
  components: {ProductInCheckOut},
  props: {
    checkout: {
      require: true,
      type: Object
    },
    date: {
      require: true,
      type: String
    },
    totalPrice: {
      require: true,
      type: String
    },
    status: {
      require: true,
      type: String
    }
  },
  data:() => ({
    statuss: "",
    data: {},
    arrProduct: [],
  }),
  async mounted() {
    let id = this.checkout.idOrderList;
     
    let dt = {}
    await  httpClient.post('/api/checkout/details', {
      idOrderList: id
    })
    .then(data => {
      dt = data.data
    })
    this.data = dt
    



    // let ppp = []
    // for (let i =0 ; i< this.data.products.length; i++) {
    //   let ii = this.data.products[i].idProduct
    //   await httpClient.post('/api/product/find-by-id', {
    //     idProduct: ii
    //   })
    //   .then(data => {
    //     ppp.push(data.data)
    //   })
    // }
    // this.arrProduct = ppp;
    // console.log(this.data)
     
    if(this.status == 0) {
      this.statuss = "Initial"
    }
    if(this.status == 1) {
      this.statuss = "Receive"
    }
    if(this.status == 2) {
      this.statuss = "Delivery"
    }
    if(this.status == 3) {
      this.statuss = "Complete"
    }
  }
}
</script>

<style scoped>

</style>

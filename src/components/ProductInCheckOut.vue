<template>
  <div class="full-width flex shadow-2 q-my-md row q-pa-sm">
    <q-img :src="data.photoReview" style="width: 50px; height: 50px"/>
    <div class="q-pl-sm text-left cursor-pointer" style="font-size: 12px">
        <div @click="go(`/product/${data.idProduct}`)" class="text-weight-bold">
            {{data.productName}}
        </div>
        <div>
             Quanlity: {{quanlity}}
        </div>
    </div>
  </div>
</template>

<script>
import {httpClient} from "src/config/httpClient";

export default {
  name: "ProductInCheckOut",
  props: {
    product: {
      require: true,
      type: Object
    }
  },
  methods: {
    go (url) {
        if (this.$route.path !== url) {
            this.$router.replace(url)
        }
    },
  },
  data:() => ({
    data: {},
    quanlity: 0
  }),
  async mounted() {
    let data = {};
    this.quanlity = this.product.quanlity;
    let id = this.product.idProduct;
    await httpClient.post('/api/product/find-by-id',{
        idProduct: id
    })
    .then(data => {
        if (data.code == 1) {
            this.data = data.data
        }
    })
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="col-12 card-root q-my-md row">
    <div class="col-3 flex items-center justify-center">
      <q-img :src="product.photoReview" alt=""/>
    </div>
    <div class="col-8 q-my-sm">
      <div class="col-12 q-ml-sm text-h6 text-weight-bold">
        ${{ product.isSaling ? product.salePrice : product.price }}
      </div>
      <div @click="go(`/product/${product.idProduct}`)" class="cursor-pointer hoverr col-12 q-ml-sm text-subtitle1">
        {{product.productName}}
      </div>
      <div class="content-card col-12 q-ml-sm q-mt-xs  text-subtitle2 flex">
        <div>
          {{ color }}
        </div>
        <q-separator vertical class="q-mx-md" inset/>
        <div>
          {{ `Size ${this.size.id}(${this.size.name})` }}
        </div>
      </div>
      <div class="col-12 content-card q-ml-sm q-mt-sm text-subtitle2 flex">
        Quantity:
        <q-btn class="q-mx-md-md q-mx-xs-xs" @click="Editt('add')" icon="add" outline size="xs"/>
        {{ product.quanlity }}
        <q-btn class="q-mx-md-md q-mx-xs-xs" @click="Editt('sub')" icon="remove" outline size="xs"/>
      </div>
    </div>
    <div class="col-1 flex">
      <q-icon @click="del = !del" name="close" class="q-mt-sm q-mr-sm q-ml-auto cursor-pointer" size="md" />
      <q-dialog v-model="del" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="clear" color="primary" text-color="white" />
            <span class="q-ml-sm">You really want to delete this item from cart?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Yes! Sure" @click="$emit('delCart',{product: product})" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
export default {
  name: "CardProductCart",
  data() {
    return {
      color: "",
      del: false,
      size: {}
    }
  },
  methods: {
    Editt(type) {
      this.$emit("editQuan",{type:type, product: this.product})
    },
    go (url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
  },
  async mounted() {
    JSON.parse(localStorage.getItem('size')).map(item => {
      if (item.idSize === this.product.idSize) {
        this.size.id = item.idSize
        this.size.name = item.sizeName
      }
    })
    JSON.parse(localStorage.getItem('color')).map(item => {
      if (item.idColor === this.product.idColor) {
        this.color = item.colorName
      }
    })
  },
  props: {
    product: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped>
.card-root {
  font-family: Actor;
}
.hoverr:hover {
  color: darkslateblue;
}
.content-card {
  color: grey;
}
</style>

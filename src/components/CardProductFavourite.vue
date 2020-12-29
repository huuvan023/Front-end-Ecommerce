<template>
  <div class="col-lg-4 col-md-6 col-xs-12 q-px-sm-sm">
    <q-card class="card-handle">
      <q-card-section class="col-12 no-padding">
        <q-img style="max-height: 35vh" :src="product.photoReview">
          <q-badge v-if="isNew" color="red" style="font-family: Actor" align="top">NEW</q-badge>
          <q-dialog v-model="delConfirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="clear" color="primary" text-color="white" />
                <span class="q-ml-sm">Sure?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Yes! Sure" @click="delConfirmAction" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-btn @click="delConfirm = !delConfirm" outline class="absolute-top-right q-mt-xs q-mr-xs"
                 round color="dark">
            <q-tooltip>
             Delete this one
            </q-tooltip>
            <q-icon color="dark" name="close"/>
          </q-btn>
        </q-img>
        <div class="q-mt-md q-mb-sm full-width">
          <div class="flex full-width justify-center">
            <q-rating
              v-model="ratingModel"
              size="2em"
              color="yellow-14"
              readonly >
              <template v-slot:tip-1>
                <q-tooltip v-if="ratingModel >= 1">Normal</q-tooltip>
              </template>
              <template v-slot:tip-2>
                <q-tooltip v-if="ratingModel >= 2">Not bad</q-tooltip>
              </template>
              <template v-slot:tip-3>
                <q-tooltip v-if="ratingModel >= 3">Good</q-tooltip>
              </template>
              <template v-slot:tip-4>
                <q-tooltip v-if="ratingModel >= 4">Very good</q-tooltip>
              </template>
              <template v-slot:tip-5>
                <q-tooltip v-if="ratingModel >= 5">Excellent!</q-tooltip>
              </template>
            </q-rating>
          </div>
          <div @click="go(`/product/${product.idProduct}`)"
               class="cursor-pointer flex justify-center text-subtitle1 q-mt-xs-xs q-mt-md-sm  full-width">
            <div class="q-mx-md">
              {{ product.productName }}
            </div>
          </div>
          <div class="flex justify-center q-mt-xs-xs q-mt-md-sm full-width">
            <div class="flex text-h6 text-weight-bold q-mb-md">
              <div v-if="product.isSaling" class="q-mx-xs">{{ product.salePrice }}$</div>
              <div v-if="!product.isSaling" class="q-mx-xs">{{ product.price }}$</div>
              <span v-if="product.isSaling"> - </span>
              <div v-if="product.isSaling" class="q-mx-xs text-red" style="text-decoration: line-through">{{product.price}}$</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="col-12 q-mb-md">
      <q-btn outline @click="addCartConfirm = !addCartConfirm" class=" full-width" label="ADD TO CART"/>
      <q-dialog v-model="addCartConfirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="clear" color="primary" text-color="white" />
            <span class="q-ml-sm">Sure?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Yes! Sure" @click="addToCart" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
export default {
  name: "CardProductFavourite",
  data () {
    return {
      delConfirm: false,
      addCartConfirm: false,
      ratingModel: 4,
      isNew: false
    }
  },
  methods: {
    go (url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
    async addToCart() {
      if(sessionStorage.getItem('cart')) {
        let cartSession = []
        let check = 0;
        cartSession = JSON.parse(sessionStorage.getItem('cart')).map(item => {
          let a = item.quanlity;
          if (item.idProduct === this.product.idProduct) {
            a++;
            check ++;
          }
          return {...item, quanlity : a};
        })
        if (check === 0) {
          let currFavourite = JSON.parse(sessionStorage.getItem('cart'));
          currFavourite.push({...this.product, quanlity: 1});
          sessionStorage.setItem('cart', JSON.stringify(currFavourite))
          this.$store.commit('product/setCartItem', JSON.parse(sessionStorage.getItem('cart')).length)
        }
        else {
          sessionStorage.setItem('cart', JSON.stringify(cartSession))
          this.$store.commit('product/setCartItem', JSON.parse(sessionStorage.getItem('cart')).length)
        }
      } else {
        var a = [];
        a.push({...this.product, quanlity: 1})
        sessionStorage.setItem('cart',JSON.stringify(a))
        this.$store.commit('product/setCartItem', JSON.parse(sessionStorage.getItem('cart')).length)
      }
      this.$q.notify({
        type: 'positive',
        message: `Add item to your cart successfully!`,
        position: 'top-right',
        timeout: 1000
      })
      this.addCartConfirm = false
    },
    async delConfirmAction() {
      var newFavou = JSON.parse(localStorage.getItem('favourite')).filter(item => {
        return item.idProduct !== this.product.idProduct
      })
      localStorage.setItem('favourite', JSON.stringify(newFavou))
      this.delConfirm = false
      this.$emit('onDelFavourite',{id:this.product.idProduct} )
    }
  },
  mounted() {
    this.isNew = ((new Date() - new Date(this.product.dateAdded)) < 86400000*3 ) ? true : false;
  },
  props: {
    product: {
      require: true,
      type: Object
    },
  }
}
</script>

<style scoped>
.card-handle:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all .5s;
}
</style>

<template>
  <div class="col-lg-4 col-md-6 col-xs-12 q-px-sm-sm">
    <q-card class=" card-handle full-width ">
      <q-card-section class="col-12 no-padding">
        <q-img style="max-height: 35vh" :src="this.product.photoReview">
          <q-badge v-if="isNew" color="red" style="font-family: Actor" align="top">NEW</q-badge>
          <q-btn outline class="absolute-bottom-right q-mb-xs q-mr-xs"
                 @click="addFavourite"
                 round color="red">
            <q-tooltip>
              Your {{ favourite ? 'like' : 'don\'t like'}} this one
            </q-tooltip>
            <q-icon v-if="!favourite" color="red" name="favorite_border"/>
            <q-icon v-if="favourite" color="red" name="favorite"/>
          </q-btn>

          <q-btn outline class="absolute-bottom-left q-mb-xs q-mr-xs"
                 @click="addCartConfirm = !addCartConfirm"
                 round color="dark">
            <q-dialog v-model="addCartConfirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="clear" color="primary" text-color="white" />
                  <span class="q-ml-sm">Add this item to your cart?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn flat label="Yes! Sure" @click="addToCart" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-tooltip>
              Add to your cart
            </q-tooltip>
            <q-icon color="dark" name="shopping_cart"/>
          </q-btn>
        </q-img>
        <div class="q-my-md full-width" @click="go(`/product/${product.idProduct}`)">
          <div class="flex full-width justify-center">
            <q-rating
              v-model="totalRate"
              size="2em"
              :disable="true"
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
          <div class="flex justify-center text-subtitle2 q-mt-xs-xs q-mt-md-md  full-width">
            <div class="q-mx-md">
              {{ this.product.productName }}
            </div>
          </div>
          <div class="flex justify-center q-mt-xs-xs q-mt-md-md full-width">
            <div class="flex text-h6 text-weight-bold q-mb-md">
              <div v-if="this.product.isSaling !== 1" class="q-mx-xs">{{this.product.price}}$</div>
              <div v-if="this.product.isSaling === 1" class="q-mx-xs">{{this.product.salePrice}}$</div>
              <span v-if="this.product.isSaling === 1" > - </span>
              <div v-if="this.product.isSaling === 1" class="q-mx-xs text-red" style="text-decoration: line-through">
                {{this.product.price}}$
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import {httpClient} from "src/config/httpClient";
export default {
  name: "CardProductDashboard",
  data () {
    return {
      ratingModel: 4,
      favourite: false,
      isNew: false,
      totalRate: 0,
      addCartConfirm: false
    }
  },
  methods: {
    go (url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
    async getRating(){
      let total = 0;
      let arr = []
      let id = this.product.idProduct
      await httpClient.post('/api/rating/get-by', {
        idProduct: id
      })
      .then(data => {
        if (data.code === 1) {
          arr = data.data;
        }
      })
      await arr.map(item => {
        total += item.rate
      })
      if (arr.length > 0) {
        this.totalRate = await Math.round(total/arr.length)
      }
      else {
        this.totalRate = 0
      }
      console.log(total)
    },
    async addFavourite() {
      if(localStorage.getItem('favourite')) {
        //console.log(this.favourite)
        if (!this.favourite) {
          var check = 0;
          JSON.parse(localStorage.getItem('favourite')).map(item => {
            if (item.idProduct === this.product.idProduct) {
              check ++
            }
          })
          if (check === 0) {
            var currFavourite = JSON.parse(localStorage.getItem('favourite'));
            currFavourite.push(this.product);
            localStorage.setItem('favourite', JSON.stringify(currFavourite))
            await this.fetchFavourite()
          }
        }
        else {
          var newFavou = JSON.parse(localStorage.getItem('favourite')).filter(item => {
            return item.idProduct !== this.product.idProduct
          })
          localStorage.setItem('favourite', JSON.stringify(newFavou))
          this.favourite = false
          await this.fetchFavourite()
        }
      } else {
        var a = [];
        a.push(this.product)
        localStorage.setItem('favourite',JSON.stringify(a))
        await this.fetchFavourite()
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
    },
    async fetchFavourite() {
      if (localStorage.getItem('favourite')) {
        //console.log(JSON.parse(localStorage.getItem('favourite')))
        var arr = JSON.parse(localStorage.getItem('favourite'))
        for( let i=0; i < arr.length; i++){
         // console.log(arr[i].idProduct, this.product.idProduct)
          if (arr[i].idProduct === this.product.idProduct) {
            this.favourite= true
            break;
          }
        }
        this.$store.commit('product/setFavouriteItem', JSON.parse(localStorage.getItem('favourite')).length)
      }
    }
  },
  async mounted() {
    await this.fetchFavourite()
    await this.getRating();
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
.card-handle {
  cursor:pointer;
}
.card-handle:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all .5s;
}
.wrapBuyN:hover .buyN {
  display: block;
}
.buyN{
  display: none;
}
</style>

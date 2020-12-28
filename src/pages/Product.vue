<template>
  <div class="row q-mt-sm col-12 q-mb-xl">
    <div class="col-11 row q-mx-auto q-mb-sm">
      <q-breadcrumbs class="col-12 q-my-md-md q-my-xs-sm">
        <q-breadcrumbs-el to="/" label="Home" />
        <q-breadcrumbs-el label="Products" />
      </q-breadcrumbs>
      <q-separator/>
    </div>
    <div class="col-md-8 col-xs-12 q-mx-auto row">
      <div class="col-sm-1 quick-crs">
       <div class="col-12 row">
         <q-img :src="item.link" :alt="item.name" :key="index"
                v-for="(item,index) in photos"
                @click="slideProduct = item.link"
                :class="slideProduct === item.link ? 'col-10 cursor-pointer img-active q-mx-auto q-mt-sm' : 'col-10 cursor-pointer q-mx-auto q-mt-sm'"/>
       </div>
      </div>
      <div class="col-md-6 col-xs-12">
        <q-carousel
          animated
          arrows
          class="q-mx-sm"
          control-color="dark"
          control-type="push"
          style="height: auto"
          navigation
          v-model="slideProduct"
        >
          <q-carousel-slide  class="col-12 full-width no-padding" v-for="(item,index) in photos" :key="index" :name="item.link">
            <viewer :options="viewerOptions">
              <img :src="item.link" style="width: 100%" alt="products"/>
            </viewer>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div style="font-family: Actor" class="row q-mt-lg q-mx-xs-auto q-mx-md-none col-md-5 col-xs-10">
        <div class="col-12 q-ml-md-lg">
          <div class="col-10 text-responsv">
            {{ data.productName }}
          </div>
          <div class="col-12 q-mt-lg flex text-h4 text-weight-bold">
            <div v-if="data.isSaling <= 0" class="q-mx-xs text-red">{{data.price}}$</div>
            <div v-if="data.isSaling > 0" class="q-mx-xs text-red">{{data.salePrice}}$</div>
            <span v-if="data.isSaling > 0"> - </span>
            <div v-if="data.isSaling > 0" class="q-mx-xs" style="text-decoration: line-through">{{data.price}}$</div>
          </div>
          <div class="col-12 q-mt-lg flex text-h6">
            <div class="text-weight-bold">
              Colour:
            </div>
            <div class="q-ml-md">
              {{ data.colorName }}
            </div>
          </div>
          <div class="col-12 q-mt-sm flex text-h6">
            <div class="text-weight-bold">
              Brands:
            </div>
            <div class="q-ml-md">
              {{ data.brandName }}
            </div>
          </div>
          <div class="col-12 q-mt-md row flex items-center text-h6">
            <div class="text-weight-bold">
              Size:
            </div>
            <div class="q-ml-md">
              {{ data.sizeName  }}
            </div>
          </div>
          <div class="col-12 q-mt-lg row flex items-center text-h6">
            <q-btn @click="addToCartConfirm = !addToCartConfirm" label="Add to cart" class="q-px-md text-white bg-dark text-h6">
                <q-tooltip>
                  Add to your cart
                </q-tooltip>
            </q-btn>
            <q-btn outline class="q-ml-md" size="md"
                   round color="red" @click="addToFavourite" >
              <q-tooltip>
                Your {{ isFavourite ? 'like' : 'don\'t like'}} this one
              </q-tooltip>
              <q-icon v-if="!isFavourite" color="red" name="favorite_border"/>
              <q-icon v-if="isFavourite" color="red" name="favorite"/>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-8 col-xs-12 q-mt-md q-mx-auto row">
      <div v-for="(item,index) in productDetails" :key="index" class="col-md-4 col-sm-6 q-pl-xs-md q-pl-md-none col-xs-12">
        <div class="text-weight-bold text-h6 text-uppercase q-mt-md">
          {{item.title}}
        </div>
        <div v-for="(itemLocal, indexLocal) in item.detailDescriptions"
             class="flex items-center q-my-xs"
             :key="indexLocal">
          - {{itemLocal}}
        </div>
      </div>
    </div>
    <q-separator class="q-my-md" />
    <div style="font-family: Actor" class="col-md-8 col-xs-12 q-mx-auto row">
      <div class="col-md-6 col-xs-12 text-center">
        <div class="q-px-xs-md q-px-md-none text-weight-bold text-h6 q-my-md text-uppercase text-h5">
          REVIEWS<span class="text-subtitle2">
          ({{totalRate}} star)
        </span>
        </div>
        <div>
          <q-rating
            v-model="totalRate"
            max="5"
            size="2.5em"
            :disable="true"
            color="black"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            no-dimming
          />
          <div>({{reviewCount}} reviews)</div>
        </div>
      </div>
      <div class="col-md-6 col-xs-12 text-center">
        <div class="q-px-xs-md q-px-md-none text-weight-bold text-h6 q-my-md text-uppercase text-h5">
          MOST RECENT REVIEW
        </div>
        <div>
          <q-rating
            v-model="recentRate"
            max="5"
            :disable="true"
            size="2.5em"
            color="black"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            no-dimming
          />
        </div>
      </div>
      <div class="col-12 flex justify-center q-mt-md q-mb-sm">
        <q-btn label="Show all reviews" @click="open()"  outline class="text-weight-bold text-subtitle1"/>
      </div>

      <q-dialog v-model="dialog" position="right" full-height>
       <q-card style="width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-weight-bold">All reviews</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator inset/>

        <q-card-section>
          <div class="flex items-center">
            <q-rating
              v-model="totalRate"
              :disable="true"
              max="5"
              size="2.5em"
              color="black"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
            <div>({{reviewCount}} reviews)</div>
            <div class="text-subtitle1 text-weight-bold q-ml-md">{{ totalRate }} Stars</div>
          </div>
          <q-separator inset class="q-my-md"/>
          <div class="text-subtitle1 text-weight-bold q-mb-md">Comments</div>
          <div class="overflow-auto">
            <UserComment v-for="(item,key) in allRate" :rate="item" :key="key"/>
          </div>
        </q-card-section>
       <q-card-section >
         <span>Rate: </span>
         <q-rating
           v-model="totalRating"
           max="5"
           size="2.5em"
           color="black"
           icon="star_border"
           icon-selected="star"
           icon-half="star_half"
           no-dimming
         />
         <q-input type="text" v-model="userComment" label="Type your comment" outlined color="black">
           <template v-slot:append>
             <q-icon @click="addComment" name="send" class="cursor-pointer" color="black" />
           </template>
         </q-input>
       </q-card-section>
      </q-card>
    </q-dialog>
    </div>
    <q-separator class="q-my-md" />
    <div style="font-family: Actor" class="col-md-8 col-xs-12 q-mx-auto row">
      <div class="q-px-xs-md q-px-md-none text-weight-bold text-h5 q-my-md text-uppercase text-h5">
        YOU MIGHT ALSO LIKE
      </div>
      <div class="col-12">
        <q-carousel
          v-model="slideOffer"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="dark"
          navigation
          padding
          arrows
          style="height: 65vh"
        >
          <q-carousel-slide v-for="(item,key) in reccommend" :name="key"  class="column no-wrap">
            <div class="row col-12 fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <div style="margin: 0 auto">
                <CardProductDashboard :key="key" :product="item"/>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
    <q-separator class="q-my-md" />
    <div style="font-family: Actor" class="col-md-8 col-xs-12 q-mx-auto row">
      <div class="q-px-xs-md q-px-md-none text-weight-bold text-h5 flex col-12 items-center q-my-md text-uppercase text-h5">
        <div>
          RECENTLY VIEWED
        </div>
        <q-btn @click="clearAllreCe = !clearAllreCe" outline label="CLEAR ALL" class="q-ml-auto text-caption bg-blue-grey-1" />
      </div>
      <q-dialog v-model="clearAllreCe" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="shopping_cart" color="primary" text-color="white" />
            <span class="q-ml-sm">Sure?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Yes! Sure" @click="ClearAllRecent" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="addToCartConfirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="shopping_cart" color="primary" text-color="white" />
            <span class="q-ml-sm">You really want to add this item to cart?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Yes! Sure" @click="addToCart" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="col-12">
        <q-carousel
          v-model="slideViewed"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="dark"
          navigation
          padding
          arrows
          style="min-height: 25vh"
        >
          <q-carousel-slide :name="1" class="column no-wrap">
            <div class="row col-12 fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <CardProductViewed v-for="(item,key) in recentView" :key="key"
                                 :product="item" @fetchRecentView="fetchRecentView"/>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import CardProductViewed from "components/CardProductViewed";
import CardProductDashboard from "components/CardProductDashboard";
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

import 'quasar/dist/quasar.addon.css'
import UserComment from "components/UserComment";
import {httpClient} from "src/config/httpClient";
import {mapActions, mapState} from "vuex";
export default {
  name: "Product",
  components: {UserComment, CardProductDashboard,CardProductViewed},
  computed:{
    ...mapState(
      'product', ['men','women','product']
    )
  },
  data () {
    return {
      clearAllreCe: false,
      addToCartConfirm:false,
      slideOffer: 1,
      slide: 'style',
      slideViewed: 1,
      visible:false,
      isFavourite: false,
      slideProduct: '',
      photos: [],
      recentView: [],
      data: {},
      routes: "",
      recentRate: 0,
      reccommend: [],
      viewerOptions: {
        "button": true,
        "navbar": false,
        "title": true,
        "toolbar": false,
        "tooltip": true,
        "movable": true,
        "zoomable": true,
        "rotatable": true,
        "scalable": true,
        "transition": true,
        "fullscreen": false,
        "keyboard": true
      },
      productDetails: [],
      totalRating: 0,
      userComment: "",
      recentlyRating: 2,
      dialog: false,
      allRate: [],
      reviewCount: 0,
      totalRate: 0,
    }
  },
  methods: {
    ...mapActions({
      handleFetchUser: 'user/fetchUser',
      handleGetproductByType: 'product/getProductByType',
      handleFetchProduct: 'product/fetchProduct'
    }),
    async addComment(){
      this.$q.loading.show()
      await httpClient.post('/api/rating/add', {
        idProduct: this.data.idProduct,
        rate: this.totalRating,
        comment: this.userComment
      })
      .then(data => {
        if (data.code === 1) {
          this.$q.notify({
            color: 'positive',
            message: 'Add new comment success!',
            position: 'top-right',
            timeout: 1000
          })
        }
        else {
          this.$q.notify({
            color: 'negative',
            message: 'Session expired!',
            position: 'top-right',
            timeout: 1000
          })
        }
      })
      await this.getRating();
      await this.fetchRecentView();
      this.userComment = "";
      this.totalRating = 0;
      this.$q.loading.hide()
    },
    async reload(){
      this.$q.loading.show()
      await this.fetchFavourite();
      await this.handleGetproductByType('M');
      await this.handleGetproductByType('W');

      console.log(this.totalRate)
      let id = this.$router.currentRoute.params.idProduct
      await this.handleFetchProduct({id});
      this.data = this.product;

      await httpClient.post('/api/product-photo/find-by-id',{
        idProduct: id
      })
        .then(data => {
          if(data.code === 1) {
            this.photos = data.data
            this.slideProduct = this.photos[0].link
          }else {
            this.$q.notify({
              color: 'negative',
              message: 'Something went wrong!',
              position: 'top',
              timeout: 1000
            })
          }
        })
        .catch(e => {
          this.$q.notify({
            color: 'negative',
            message: 'Something went wrong!',
            position: 'top',
            timeout: 1000
          })
        })
      await this.fetchRecentView()
      await this.getRating();
      await JSON.parse(localStorage.getItem('size')).map(item => {
        if (item.idSize === this.data.idSize) {
          this.data.sizeName = item.sizeName
        }
      })
      await JSON.parse(localStorage.getItem('color')).map(item => {
        if (item.idColor === this.data.idColor) {
          this.data.colorName = item.colorName
        }
      })
      await JSON.parse(localStorage.getItem('brand')).map(item => {
        if (item.idBrand === this.data.idBrand) {
          this.data.brandName = item.brandName;
          this.data.brandDetail = item.brandDetail;
        }
      })
      this.productDetails = [
        {
          title: 'PRODUCT DETAILS',
          detailDescriptions: this.data.detail.split("^")
        },
        {
          title: 'PRODUCT CODE',
          detailDescriptions: [`${this.data.idProduct}`]
        },
        {
          title: 'BRAND',
          detailDescriptions: [`${this.data.brandDetail}`]
        }]

      await this.fetchMightAloLike()
      await this.addToView();
      this.$q.loading.hide()
    },
    open () {
      this.dialog = true
    },
    async getRating(){
      let Array = []
      console.log(this.data)
      let id = this.data.idProduct
      console.log('fetch rate')
      await httpClient.post('/api/rating/get-by', {
        idProduct: id
      })
      .then(data => {
        console.log('fetchhh', data)
        if (data.code === 1) {
          console.log('fetchhaasdah', data)
          Array = data.data;
          console.log(Array)
          return
        }
        else {
          this.recentRate = 0;
        }
      })
      let ttRate = 0;
      await Array.map(item => {
        ttRate += item.rate
      })

      this.reviewCount = Array.length
      if (Array.length > 0) {
        this.totalRate = await Math.round(ttRate/Array.length)
      }
      else {
      this.totalRate = 0
      }
      if (this.totalRate > 5) {
        this.totalRate = 5
      }
      this.allRate = await Array.sort((a, b) => {
        return  new Date(b.rateDate) - new Date(a.rateDate)
      });
      if (this.allRate.length > 0) {
        this.recentRate = this.allRate[0].rate
      }else {
        this.recentRate = 0
      }

    },
    async fetchRecentView() {
      if(localStorage.getItem('recentView')) {
        this.recentView = JSON.parse(localStorage.getItem('recentView'))
      }
    },
    async addToView(){
      if(localStorage.getItem('recentView')) {
        var check = 0;
        JSON.parse(localStorage.getItem('recentView')).map(item => {
          if (item.idProduct === this.data.idProduct) {
            check ++
          }
        })
        if (check === 0) {
          var currFavourite = JSON.parse(localStorage.getItem('recentView'));
          currFavourite.push(this.data);
          localStorage.setItem('recentView', JSON.stringify(currFavourite))
          //await this.fetchFavourite()
        }
      } else {
        var a = [];
        a.push(this.data)
        localStorage.setItem('recentView',JSON.stringify(a))
        // await this.fetchFavourite()
      }
    },
    async ClearAllRecent() {
      await  localStorage.removeItem('recentView');
      this.recentView = []
    },
    async fetchMightAloLike(){
      this.reccommend = this.men.filter(item => {
        return item.idCategory === this.data.idCategory
      })
      // this.reccommend = a.filter(item => {
      //   return item.idProduct !== this.data.idProduct
      // })
    },
    async fetchFavourite() {
      if (localStorage.getItem('favourite')) {
        //console.log(JSON.parse(localStorage.getItem('favourite')))
        var arr = JSON.parse(localStorage.getItem('favourite'))
        for( let i=0; i < arr.length; i++){
          // console.log(arr[i].idProduct, this.product.idProduct)
          if (arr[i].idProduct === this.data.idProduct) {
            this.isFavourite = true
            break;
          }
        }
        this.$store.commit('product/setFavouriteItem', JSON.parse(localStorage.getItem('favourite')).length)
      }
    },
    async addToFavourite(){
      if(localStorage.getItem('favourite')) {
        //console.log(this.favourite)
        if (!this.isFavourite) {
          var check = 0;
          JSON.parse(localStorage.getItem('favourite')).map(item => {
            if (item.idProduct === this.data.idProduct) {
              check ++
            }
          })
          if (check === 0) {
            var currFavourite = JSON.parse(localStorage.getItem('favourite'));
            currFavourite.push(this.data);
            localStorage.setItem('favourite', JSON.stringify(currFavourite))
            await this.fetchFavourite()
          }
        }
        else {
          var newFavou = JSON.parse(localStorage.getItem('favourite')).filter(item => {
            return item.idProduct !== this.data.idProduct
          })
          localStorage.setItem('favourite', JSON.stringify(newFavou))
          this.isFavourite = false
          await this.fetchFavourite()
        }
      } else {
        var a = [];
        a.push(this.data)
        localStorage.setItem('favourite',JSON.stringify(a))
        await this.fetchFavourite()
      }
    },
    addToCart() {
      if(sessionStorage.getItem('cart')) {
        let cartSession = []
        let check = 0;
        cartSession = JSON.parse(sessionStorage.getItem('cart')).map(item => {
          let a = item.quanlity;
          if (item.idProduct === this.data.idProduct) {
            a++;
            check ++;
          }
          return {...item, quanlity : a};
        })
        if (check === 0) {
          let currFavourite = JSON.parse(sessionStorage.getItem('cart'));
          currFavourite.push({...this.data, quanlity: 1});
          sessionStorage.setItem('cart', JSON.stringify(currFavourite))
          this.$store.commit('product/setCartItem', JSON.parse(sessionStorage.getItem('cart')).length)
        }
        else {
          sessionStorage.setItem('cart', JSON.stringify(cartSession))
          this.$store.commit('product/setCartItem', JSON.parse(sessionStorage.getItem('cart')).length)
        }
      } else {
        var a = [];
        a.push({...this.data, quanlity: 1})
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

  },
  watch: {
    '$route.params.idProduct': async function (idProduct) {
      await this.reload()

    }
  },
  async mounted() {
    await this.reload()
  }
}
</script>

<style scoped>
.img-active {
  border: 3px solid grey;
}
.text-responsv {
  font-size: 30px;
}
@media screen and (max-width: 1024px){
  .text-responsv {
    font-size: 25px;
  }
}
@media screen and (max-width: 768px){
  .text-responsv {
    font-size: calc(20px + 8 * ((100vw - 320px) / 960));
  }
  .quick-crs {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .text-responsv {
    font-size: calc(20px + 8 * ((100vw - 320px) / 960));
  }
}
@media screen and (max-width: 320px) {
  .text-responsv {
    font-size: calc(20px + 8 * ((100vw - 320px) / 960));
  }
}
</style>

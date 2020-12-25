<template>
  <div class="row q-mt-sm col-12 q-mb-xl">
    <div class="col-11 row q-mx-auto q-mb-sm">
      <q-breadcrumbs class="col-12 q-my-md-md q-my-xs-sm">
        <q-breadcrumbs-el to="/" label="Home" />
        <q-breadcrumbs-el to="/men-products" label="Men products" />
        <q-breadcrumbs-el label="Products" />
      </q-breadcrumbs>
      <q-separator/>
    </div>
    <div class="col-md-8 col-xs-12 q-mx-auto row">
      <div class="col-sm-1 quick-crs">
       <div class="col-12 row">
         <q-img :src="item.src" :alt="item.name" :key="index"
                v-for="(item,index) in gallerySlider"
                @click="slideProduct = item.name "
                :class="slideProduct === item.name ? 'col-10 cursor-pointer img-active q-mx-auto q-mt-sm' : 'col-10 cursor-pointer q-mx-auto q-mt-sm'"/>
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
          <q-carousel-slide  class="col-12 full-width no-padding" v-for="(item,index) in gallerySlider" :key="index" :name="item.name">
            <viewer :options="viewerOptions">
              <img :src="item.src" style="width: 100%" alt="products"/>
            </viewer>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div style="font-family: Actor" class="row q-mt-lg q-mx-xs-auto q-mx-md-none col-md-5 col-xs-10">
        <div class="col-12 q-ml-md-lg">
          <div class="col-10 text-responsv">
            ASOS DESIGN polar fleece sweatshirt with half zip & triangle print in grey
          </div>
          <div class="col-12 q-mt-lg flex text-h4 text-weight-bold">
            <div class="q-mx-xs text-red">$40.00</div> -
            <div class="q-mx-xs" style="text-decoration: line-through">$60.00</div>
          </div>
          <div class="col-12 q-mt-lg flex text-h6">
            <div class="text-weight-bold">
              Colour:
            </div>
            <div class="q-ml-md">
              Wet weather
            </div>
          </div>
          <div class="col-12 q-mt-sm flex text-h6">
            <div class="text-weight-bold">
              Brands:
            </div>
            <div class="q-ml-md">
              Product Brands
            </div>
          </div>
          <div class="col-12 q-mt-md row flex items-center text-h6">
            <div class="text-weight-bold">
              Size:
            </div>
            <div class="q-ml-md">
              <q-select
                color="dark"
                style="font-family: Alata"
                transition-show="jump-up"
                transition-hide="jump-up"
                outlined v-model="sizeChoose" :options="sizeOptions"/>
            </div>
          </div>
          <div class="col-12 q-mt-lg row flex items-center text-h6">
            <q-btn @click="addToCart" label="Add to cart" class="q-px-md text-white bg-dark text-h6">
                <q-tooltip>
                  Add to your cart
                </q-tooltip>
            </q-btn>
            <q-btn outline class="q-ml-md" size="md"
                   round color="red" @click="isFavourite = !isFavourite" >
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
          REVIEWS
        </div>
        <div>
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
          <div>(3 reviews)</div>
        </div>
      </div>
      <div class="col-md-6 col-xs-12 text-center">
        <div class="q-px-xs-md q-px-md-none text-weight-bold text-h6 q-my-md text-uppercase text-h5">
          MOST RECENT REVIEW
        </div>
        <div>
          <q-rating
            v-model="recentlyRating"
            max="5"
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
              v-model="totalRating"
              max="5"
              size="2.5em"
              color="black"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
            <div>(3 reviews)</div>
            <div class="text-h5 text-weight-bold q-ml-md">4.5</div>
          </div>
          <q-separator inset class="q-my-md"/>
          <div class="text-subtitle1 text-weight-bold q-mb-md">Comments</div>
          <div class="overflow-auto">
            <UserComment/>
            <UserComment/>
            <UserComment/>
            <UserComment/>
            <UserComment/>
            <UserComment/>
            <UserComment/>
            <UserComment/>
            <UserComment/>
            <UserComment/>
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
         <q-input type="text" label="Type your comment" outlined color="black">
           <template v-slot:append>
             <q-icon name="send" class="cursor-pointer" color="black" />
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
          <q-carousel-slide :name="1" class="column no-wrap">
            <div class="row col-12 fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <CardProductDashboard :isNew="false" :favourite="true" :ratingModel="2" :linkURLImage="'/products/product4.png'"/>
              <CardProductDashboard :isNew="true" :favourite="true" :ratingModel="1" :linkURLImage="'/products/product5.png'"/>
              <CardProductDashboard :isNew="false" :favourite="false" :ratingModel="5" :linkURLImage="'/products/product6.png'"/>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">
            <div class="row col-12 fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <CardProductDashboard :isNew="false" :favourite="true" :ratingModel="4" :linkURLImage="'/products/product2.png'"/>
              <CardProductDashboard :isNew="true" :favourite="false" :ratingModel="2" :linkURLImage="'/products/product1.png'"/>
              <CardProductDashboard :isNew="true" :favourite="false" :ratingModel="3" :linkURLImage="'/products/product6.png'"/>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="column no-wrap">
            <div class="row col-12 fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <CardProductDashboard :isNew="false" :favourite="false" :ratingModel="2" :linkURLImage="'/products/product4.png'"/>
              <CardProductDashboard :isNew="false" :favourite="false" :ratingModel="1" :linkURLImage="'/products/product3.png'"/>
              <CardProductDashboard :isNew="true" :favourite="false" :ratingModel="2" :linkURLImage="'/products/product1.png'"/>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="4" class="column no-wrap">
            <div class="row col-12 fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <CardProductDashboard :isNew="true" :favourite="false" :ratingModel="2" :linkURLImage="'/products/product1.png'"/>
              <CardProductDashboard :isNew="true" :favourite="false" :ratingModel="5" :linkURLImage="'/products/product5.png'"/>
              <CardProductDashboard :isNew="false" :favourite="false" :ratingModel="5" :linkURLImage="'/products/product6.png'"/>
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
        <q-btn outline label="CLEAR ALL" class="q-ml-auto text-caption bg-blue-grey-1" />
      </div>
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
              <CardProductViewed :isNew="false" :favourite="true" :ratingModel="2" :linkURLImage="'/products/product4.png'"/>
              <CardProductViewed :isNew="true" :favourite="true" :ratingModel="1" :linkURLImage="'/products/product5.png'"/>
              <CardProductViewed :isNew="false" :favourite="false" :ratingModel="5" :linkURLImage="'/products/product6.png'"/>
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
export default {
  name: "Product",
  components: {UserComment, CardProductDashboard,CardProductViewed},
  data () {
    return {
      slideOffer: 1,
      slideViewed: 1,
      visible:false,
      isFavourite: false,
      slideProduct: 'product1',
      gallerySlider: [
        {
          src: '/product-ex/pro1.jpeg',
          name: 'product1'
        },
        {
          src: '/product-ex/pro2.jpeg',
          name: 'product2'
        },
        {
          src: '/product-ex/pro3.jpeg',
          name: 'product3'
        },
        {
          src: '/product-ex/pro4.jpeg',
          name: 'product4'
        }
      ],
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
      sizeOptions: [
        {
          label: 'S-(Chest 91-96cm)',
          value: 'SizeS',
          disable: true,
        },
        {
          label: 'M-(Chest 96-101cm)',
          value: 'SizeM',
          disable: false,
        },
        {
          label: 'L-(Chest 101-106cm)',
          value: 'SizeL',
          disable: false,
        },
        {
          label: 'XL-(Chest 106-111cm)',
          value: 'SizeXL',
          disable: true,
        },
      ],
      sizeChoose: {
        label: 'S-(Chest 91-96cm)',
        value: 'SizeS',
        disable: false,
      },
      productDetails: [
        {
          title: 'PRODUCT DETAILS',
          detailDescriptions: [
            'A fresh addition',
            'Funnel neck',
            'Half-zip design',
            'Small logo',
            'Fitted trims',
            'Regular fit',
            'True to size'
          ]
        },
        {
          title: 'SIZE & FIT',
          detailDescriptions: [
            'Model\'s height: 6\'3.5”/192 cm',
            'Model is wearing: Size Medium'
          ]
        },
        {
          title: 'BRAND',
          detailDescriptions: [
            'This is ASOS DESIGN – your go-to for all the latest trends, no matter who you are,' +
            'where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you,' +
            'and comes in Plus and Tall. Created by us, styled by you.'
          ]
        },
        {
          title: 'PRODUCT CODE',
          detailDescriptions: [
            '1564835'
          ]
        },
        {
          title: 'LOOK AFTER ME',
          detailDescriptions: [
            'Just here for the care instructions?',
            'Thought you might be',
            'Machine wash according to instructions'
          ]
        },
        {
          title: 'ABOUT ME',
          detailDescriptions: [
            'Soft, cosy fleece',
            'Lightweight, insulating fabric',
            'Main: 100% Polyester.'
          ]
        }
      ],
      totalRating: 3.5,
      recentlyRating: 2,
      dialog: false
    }
  },
  methods: {
      open () {
      this.dialog = true
    },
    addToCart() {
      this.$q.notify({
        type: 'positive',
        message: `Add item to your cart successfully!`,
        position: 'top-right',
        timeout: 1000
      })
    }
  }
}
</script>

<style scoped>
.img-active {
  border: 3px solid grey;
}
.text-responsv {
  font-size: 40px;
}
@media screen and (max-width: 1024px){
  .text-responsv {
    font-size: 30px;
  }
}
@media screen and (max-width: 768px){
  .text-responsv {
    font-size: calc(40px + 8 * ((100vw - 320px) / 960));
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

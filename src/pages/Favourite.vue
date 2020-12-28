<template>
  <div class="row col-12">
    <div class="col-11 row q-mx-auto q-mb-md">
      <q-breadcrumbs class="col-12 q-my-md-md q-my-xs-sm">
        <q-breadcrumbs-el to="/" label="Home" />
        <q-breadcrumbs-el label="Favourite" />
      </q-breadcrumbs>
      <q-separator/>
    </div>
    <div class="col-md-8  q-mt-sm q-pa-sm row q-mx-auto q-mb-xl shadow-1">
        <div class="col-12 q-mx-xs q-pa-md overflow-auto">
          <div class="text-h6 text-weight-bold col-12">FAVOURITE ITEMS</div>
        </div>
      <q-separator inset class="q-mb-md"/>
      <div class="row full-width">
        <div class="col-12 q-mb-md" v-if="data.length > 0">
         <div class="flex justify-between items-center q-mx-sm">
           <q-btn-dropdown class="q-ml-sm q-mx-sm-none" outline>
             <template v-slot:label>
               <div class="row items-center no-wrap">
                 Sorting by: <span class="q-ml-lg">{{sorting}}</span>
               </div>
             </template>
             <q-list>
               <q-item clickable v-close-popup @click="onSorting('Default')">
                 <q-item-section>
                   <q-item-label>Default</q-item-label>
                 </q-item-section>
               </q-item>
               <q-item clickable v-close-popup @click="onSorting('Name')">
                 <q-item-section>
                   <q-item-label>Name</q-item-label>
                 </q-item-section>
               </q-item>

               <q-item clickable v-close-popup @click="onSorting('Price Up')">
                 <q-item-section>
                   <q-item-label>Price up</q-item-label>
                 </q-item-section>
               </q-item>

               <q-item clickable v-close-popup @click="onSorting('Price Down')">
                 <q-item-section>
                   <q-item-label>Price down</q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>
           </q-btn-dropdown>
           <div>
             {{ favouriteItem }} items
           </div>
         </div>
        </div>
        <div class="full-width flex justify-center text-weight-bolder text-body1" v-if="data.length === 0">
          <div>
            Nothing here..
          </div>
        </div>
        <div v-if="data.length > 0" class="col-12 row">
          <CardProductFavourite v-for="(item,key) in data" @onDelFavourite="onDelFavourite" :product="item" :key="key"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import CardProductFavourite from "components/CardProductFavourite";

export default {
  name: "Favourite",
  data() {
    return {
      sorting: '',
      favouriteItem: 0,
      data: []
    }
  },
  async mounted() {
    await this.fetchListFavou()
    await this.fetchFavourite()
  },
  components: {CardProductFavourite},
  methods: {
    fetchListFavou(){
      if (localStorage.getItem("favourite")) {
        this.data = JSON.parse(localStorage.getItem("favourite"))
        this.favouriteItem = this.data.length
      }
    },
    async onSorting(value) {
      this.sorting = value
      if (value === "Default") {
        await this.fetchListFavou()
      }
      if (value === 'Name') {
        this.data  = this.data.sort((a, b) => {
          let fa = a.productName.toLowerCase(),
            fb = b.productName.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

      }
      if (value === 'Price Up') {
        let tempData = this.data.map(item => {
          if (item.isSaling > 0) {
            item.price = item.salePrice
          }
          return item
        })
        this.data  = tempData.sort((a, b) => {
          return a.price - b.price
        });
      }
      if (value === 'Price Down'){
        let tempData = this.data.map(item => {
          if (item.isSaling > 0) {
            item.price = item.salePrice
          }
          return item
        })
        this.data  = tempData.sort((a, b) => {
          return b.price - a.price
        });
      }
    },
    async fetchFavourite() {
      if (localStorage.getItem('favourite')) {
        this.$store.commit('product/setFavouriteItem', JSON.parse(localStorage.getItem('favourite')).length)
      }
    },
    async onDelFavourite(id) {
      if (localStorage.getItem("favourite")) {
        this.data = JSON.parse(localStorage.getItem("favourite"))
        this.favouriteItem = this.data.length
      }
      await this.fetchFavourite()
    }
  }
}
</script>

<style scoped>

</style>

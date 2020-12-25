<template>
  <div class="row col-12">
    <div class="col-11 row q-mx-auto q-mb-md">
      <q-breadcrumbs class="col-12 q-my-md-md q-my-xs-sm">
        <q-breadcrumbs-el to="/" label="Home" />
        <q-breadcrumbs-el label="Cart" />
      </q-breadcrumbs>
      <q-separator/>
    </div>
    <div class="col-md-8  q-mt-sm q-pa-sm row q-mx-auto q-mb-xl shadow-1">
        <div class="col-12 q-mx-xs q-pa-md overflow-auto">
          <div class="text-h6 text-weight-bold col-12">FAVOURITE ITEMS</div>
        </div>
      <q-separator inset class="q-mb-md"/>
      <div class="row full-width">
        <div class="col-12 q-mb-md">
         <div class="flex justify-between items-center q-mx-sm">
           <q-btn-dropdown class="q-ml-sm q-mx-sm-none" outline>
             <template v-slot:label>
               <div class="row items-center no-wrap">
                 Sorting by: <span class="q-ml-lg">{{sorting}}</span>
               </div>
             </template>
             <q-list>
               <q-item clickable v-close-popup @click="changeSorting('Latest')">
                 <q-item-section>
                   <q-item-label>Latest</q-item-label>
                 </q-item-section>
               </q-item>
               <q-item clickable v-close-popup @click="changeSorting('Name')">
                 <q-item-section>
                   <q-item-label>Name</q-item-label>
                 </q-item-section>
               </q-item>

               <q-item clickable v-close-popup @click="changeSorting('Price up')">
                 <q-item-section>
                   <q-item-label>Price up</q-item-label>
                 </q-item-section>
               </q-item>

               <q-item clickable v-close-popup @click="changeSorting('Price down')">
                 <q-item-section>
                   <q-item-label>Price down</q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>
           </q-btn-dropdown>
           <div>
             9 items
           </div>
         </div>
        </div>
        <div class="col-12 row">
          <CardProductFavourite :isNew="false" :favourite="false" :ratingModel="4" :linkURLImage="'/products/product5.png'"/>
          <CardProductFavourite :isNew="false" :favourite="false" :ratingModel="4" :linkURLImage="'/products/product5.png'"/>
          <CardProductFavourite :isNew="false" :favourite="false" :ratingModel="4" :linkURLImage="'/products/product5.png'"/>
          <CardProductFavourite :isNew="false" :favourite="false" :ratingModel="4" :linkURLImage="'/products/product5.png'"/>
          <CardProductFavourite :isNew="false" :favourite="false" :ratingModel="4" :linkURLImage="'/products/product5.png'"/>
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
      sorting: ''
    }
  },
  components: {CardProductFavourite},
  methods: {
    changeSorting(value) {
      this.sorting = value
    }
  }
}
</script>

<style scoped>

</style>

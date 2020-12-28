<template>
  <div class="row q-mt-sm col-12">
    <div class="col-11 row q-mx-auto q-mb-xl">
      <q-breadcrumbs class="col-12 q-my-md-md q-my-xs-sm">
        <q-breadcrumbs-el to="/" label="Home" />
        <q-breadcrumbs-el label="Bags and Purses" />
      </q-breadcrumbs>
      <q-separator/>
      <div class="col-12 row">
        <div  class="col-md-4 mobile-hide col-xs-12 non-selectable">
          <div class="col-12">
            <div class="text-h5 text-weight-bold q-my-xs-sm q-my-md-md">Brands</div>
            <div class="col-12 row">
              <q-checkbox class="col-6" v-for="(item,key) in brands" v-model="item.value" size="md" :key="key" :label="item.name" color="dark" />
            </div>
          </div>
          <q-separator class="q-mt-xs-sm q-mt-md-md" inset/>
          <div class="col-12">
            <div class="text-h5 text-weight-bold q-my-xs-sm q-my-md-md">Price</div>
            <div class="flex justify-center col-12">
              <div>
                <span class="q-px-md" style="border: 1px solid black">{{rangePrice.min}}</span>
                <span class="q-mx-md">-</span>
                <span class="q-px-md" style="border: 1px solid black">{{rangePrice.max}}</span>
              </div>
            </div>
            <div class="col-12 row">
              <q-range
                color="warning"
                v-model="rangePrice"
                :min="0"
                :max="150"
              />
            </div>
            <q-separator class="q-mt-xs-sm q-mt-md-md" inset/>
            <div class="col-12">
              <div class="text-h5 text-weight-bold q-my-xs-sm q-my-md-md">Gender</div>
              <div class="col-12 row">
                <q-checkbox class="col-6" v-for="(item,key) in gender" v-model="item.value" size="md" :key="key" :label="item.name" color="dark" />
              </div>
            </div>
            <q-separator class="q-mt-xs-sm q-mt-md-md" inset/>
            <div class="col-12">
              <div class="text-h5 text-weight-bold q-my-xs-sm q-my-md-md">Tags</div>
              <div class="col-12 row">
                <q-chip v-for="(item,key) in catesList" @click="filterTags(item)" square :key="key"
                        clickable class="q-pa-md" style="border: 0.5px solid grey"
                        :color="item.isChoose ? 'grey' : 'white'">
                  {{ item.name }}
                </q-chip>
              </div>
            </div>
          </div>
        </div>

        <div class="q-pl-md-lg q-pl-xs-none col-md-8 col-sx-12">
          <div style="font-family: Alata" class="flex items-center full-width q-ml-md-md q-ml-xs-none q-my-md">
            <q-btn-dropdown class="q-ml-sm q-mx-xs-auto q-mx-sm-none" outline>
              <template v-slot:label>
                <div class="row items-center no-wrap">
                  Sorting by: <span class="q-ml-lg">{{sorting}}</span>
                </div>
              </template>
              <q-list>
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
            <q-btn-dropdown outline class="q-ml-sm-xl q-mt-xs-sm q-mt-sm-none q-mx-xs-auto">
              <template v-slot:label>
                <div class="row items-center no-wrap">
                  Show: <span class="q-ml-lg">{{showItem}} items</span>
                </div>
              </template>
              <q-list>
                <q-item clickable v-close-popup @click="changeShowItem(5)">
                  <q-item-section>
                    <q-item-label>5 items</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="changeShowItem(10)">
                  <q-item-section>
                    <q-item-label>10 items</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="changeShowItem(20)">
                  <q-item-section>
                    <q-item-label>20 items</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <div class="text-subtitle q-mx-xs-auto q-mx-sm-none q-mr-sm q-ml-md-auto q-mt-xs-sm q-mt-md-none">
              Show 01-09 of 36 Products
            </div>
          </div>
          <div class="col-12 q-mt-lg row">
            <CardProductDashboard :isNew="false" :favourite="true" :ratingModel="2" :linkURLImage="'/bagsNpurses/bagsNpurses1.jpeg'"/>
            <CardProductDashboard :isNew="false" :favourite="true" :ratingModel="4" :linkURLImage="'/bagsNpurses/bagsNpurses2.jpeg'"/>
            <CardProductDashboard :isNew="false" :favourite="false" :ratingModel="3" :linkURLImage="'/bagsNpurses/bagsNpurses3.jpeg'"/>
            <CardProductDashboard :isNew="false" :favourite="false" :ratingModel="4" :linkURLImage="'/bagsNpurses/bagsNpurses4.jpeg'"/>
            <CardProductDashboard :isNew="false" :favourite="true" :ratingModel="1" :linkURLImage="'/bagsNpurses/bagsNpurses5.jpeg'"/>
            <CardProductDashboard :isNew="true" :favourite="true" :ratingModel="2" :linkURLImage="'/bagsNpurses/bagsNpurses6.jpeg'"/>
          </div>
          <div class="col-12 flex justify-center">
            <q-pagination
              v-model="pagination"
              :max="5"
              color="dark"
              :direction-links="true"
            ></q-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import CardProductDashboard from "components/CardProductDashboard";
export default {
  name: "BagsNPurses",
  components: {CardProductDashboard},
  data () {
    return {
      sorting: '',
      pagination: 2,
      showItem: 5,
      catesList: [{
        id: 1,
        value: false,
        name: 'Purses',
        isChoose: false
      },{
        id: 2,
        value: false,
        name: 'Bags',
        isChoose: false
      }],
      brands: [{
        value: false,
        name: 'Calvin Klein'
      },{
        value: false,
        name: 'Diesel'
      },{
        value: false,
        name: 'Polo'
      },{
        value: false,
        name: 'Tommy Hilfiger'
      }],
      gender: [{
        value: false,
        name: 'Male'
      },{
        value: false,
        name: 'Female'
      }],
      rangePrice: {
        min: 0,
        max: 50
      },
      tags: []
    }
  },
  methods: {
    filterTags (item) {
      if (item.isChoose === false){
        this.tags.push(item);
        this.catesList = this.catesList.map(cateItem => {
          if (cateItem.id === item.id) {
            cateItem.isChoose = true
          }
          return cateItem
        })
      }
      else {
        let tagsList = this.tags
        this.tags = tagsList.filter(itemFilter => {
          return itemFilter.id !== item.id
        });
        this.catesList = this.catesList.map(cateItem => {
          if (cateItem.id === item.id) {
            cateItem.isChoose = false
          }
          return cateItem
        })
      }
    },
    changeShowItem(value) {
      this.showItem = value
    },
    changeSorting(value) {
      this.sorting = value
    }
  },
  computed: {
  },
  created() {
    //console.log(this.catesList)
  }
}
</script>

<style scoped>

</style>

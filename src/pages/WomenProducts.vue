<template>
  <div class="row q-mt-sm col-12">
    <div class="col-11 row q-mx-auto q-mb-xl">
      <q-breadcrumbs class="col-12 q-my-md-md q-my-xs-sm">
        <q-breadcrumbs-el to="/" label="Home" />
        <q-breadcrumbs-el label="Women products" />
      </q-breadcrumbs>
      <q-separator/>
      <div class="col-12 row">
        <div class="col-md-4 col-xs-12 non-selectable">
          <div class="col-12 row q-mt-md">
            <q-input rounded outlined v-model="searchKey"
                     color="dark" style="min-width: 30vw" placeholder="Search product" :dense="dense">
              <template v-slot:append>
                <q-icon v-if="searchKey.length > 0"
                        style="cursor: pointer"
                        @click="searchKey=''"
                        transition-show="jump-down"
                        transition-hide="jump-up" name="clear" />
              </template>

              <template v-slot:after>
                <q-btn size="lg" @click="search" round dense flat icon="search" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <div class="text-h5 text-weight-bold q-my-xs-sm q-my-md-md">Brands</div>
            <div class="col-12 row">
              <q-checkbox class="col-6" v-for="(item,key)  in brands"
                          @input="filterBrand"
                          v-model="item.value" size="md" :key="key" :label="item.name" color="dark" />
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
                @input="filterPrice"
                color="warning"
                v-model="rangePrice"
                :min="0"
                :max="1000"
              />
            </div>
            <q-separator class="q-mt-xs-sm q-mt-md-md" inset/>
            <div class="col-12">
              <div class="text-h5 text-weight-bold q-my-xs-sm q-my-md-md">Size</div>
              <div class="col-12 row">
                <q-checkbox class="col-md-6 col-xs-3"
                            @input="filterSize"
                            v-for="(item,key) in sizes"
                            v-model="item.value" size="md" :key="key" :label="item.name" color="dark" />
              </div>
            </div>
            <q-separator class="q-mt-xs-sm q-mt-md-md" inset/>
            <div class="col-12">
              <!--<div class="text-h5 text-weight-bold q-my-xs-sm q-my-md-md">Tags</div>-->
              <div class="col-12 row">
                <!-- <q-chip v-for="(item,key) in catesList" @click="filterTags(item)" square :key="key"
                         clickable class="q-pa-md" style="border: 0.5px solid grey"
                         :color="item.isChoose ? 'grey' : 'white'">
                   {{ item.name }}
                 </q-chip>-->
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
            <!--<q-btn-dropdown outline class="q-ml-sm-xl q-mt-xs-sm q-mt-sm-none q-mx-xs-auto">
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
            </div>-->
          </div>
          <div class="col-12 q-mt-lg row">
            <CardProductDashboard v-for="(item,key) in tempData" :product="item" :key="key" />
          </div>
          <!--<div class="col-12 flex justify-center">
            <q-pagination
              v-model="pagination"
              :max="5"
              color="dark"
              :direction-links="true"
            ></q-pagination>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import CardProductDashboard from "components/CardProductDashboard";
import {mapActions, mapState} from "vuex";
export default {
  name: "WomenProducts",
  components: {CardProductDashboard},
  data () {
    return {
      sorting: '',
      dense: false,
      searchKey:"",
      pagination: 2,
      showItem: 5,
      catesList: [],
      brands: [],
      tempData: [],
      data: [],
      sizes: [],
      rangePrice: {
        min: 0,
        max: 1000
      },
      tags: []
    }
  },
  async mounted() {
    await this.$q.loading.show()
    await this.getProduct()
    if(localStorage.getItem('category')) {
      this.catesList = JSON.parse(localStorage.getItem('category')).map(item => {
        return {
          id: item.idCategory,
          name: item.categoryName,
          isChoose: false
        }
      })
    }

    if(localStorage.getItem('size')) {
      this.sizes = JSON.parse(localStorage.getItem('size')).map(item => {
        return {
          id: item.idSize,
          name: item.idSize,
          description: item.sizeName,
          value: false
        }
      })
    } //brand
    if(localStorage.getItem('brand')) {
      this.brands = JSON.parse(localStorage.getItem('brand')).map(item => {
        return {
          id: item.idBrand,
          name: item.brandName,
          description: item.brandDetail,
          value: false
        }
      })
    }
    this.data = this.women;
    this.tempData = this.women
    await this.$q.loading.hide()
  },
  methods: {
    ...mapActions({
      handleGetproductByType: 'product/getProductByType',
    }),
    changeSorting(value) {
      this.sorting = value
      if(value === "Name") {
        let aa = this.tempData;
        this.tempData = aa.sort((a, b) => {
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
      if (value === 'Price up') {
        let aa = this.tempData;
        let bb = this.tempData;
        bb = aa.map(item => {
          if (item.isSaling > 0) {
            item.price = item.salePrice
          }
          return item
        })
        this.tempData = bb.sort((a, b) => {
          return a.price - b.price
        });
      }
      if (value === 'Price down') {
        let aa = this.tempData;
        let bb = this.tempData;
        bb = aa.map(item => {
          if (item.isSaling > 0) {
            item.price = item.salePrice
          }
          return item
        })
        this.tempData = bb.sort((a, b) => {
          return b.price - a.price
        });
      }
    },
    async search() {
      let dt = this.data
      this.tempData = dt.filter(item => {
        return item.productName === this.searchKey
      })
    },
    async filterSize(){
      let a = []
      for (let i=0; i< this.sizes.length; i++) {
        if(this.sizes[i].value === true) {
          a.push(this.sizes[i].id)
        }
      }
      let dt = this.data
      this.tempData = dt.filter(item => {
        return a.includes(item.idSize)
      })
    },
    async filterPrice(){
      console.log(this.rangePrice)
      let dt = this.data
      this.tempData = dt.filter(item => {
        //console.log(Number(this.rangePrice.min) > Number(item.price) && Number(this.rangePrice.max) < Number(item.price), Number(item.price))
        let pricee = item.price
        if (item.isSaling > 0) {
          pricee = item.salePrice
        }
        return Number(this.rangePrice.min) < Number(pricee) && Number(this.rangePrice.max) > Number(pricee)
      })
    },
    async filterBrand() {
      //console.log(this.brands)
      let a = []
      for (let i=0; i< this.brands.length; i++) {
        if(this.brands[i].value === true) {
          a.push(this.brands[i].id)
        }
      }
      let dt = this.data
      this.tempData = dt.filter(item => {
        console.log(a, item)
        return a.includes(item.idBrand)
      })
    },
    async getProduct() {
      await this.$q.loading.show();
      await this.handleGetproductByType('W');
      await this.$q.loading.hide();
    },
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

  },
  computed: {
    ...mapState(
      'product', ['men','women']
    )
  },
  created() {
    //console.log(process.env.VUE_ROUTER_BASE)
  }
}
</script>

<style scoped>

</style>

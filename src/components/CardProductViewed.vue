<template>
  <div  class="col-lg-4 col-md-6 col-xs-12 q-px-sm-sm">
    <q-card class="card-handle">
      <q-card-section class="col-12 no-padding">
        <q-img style="max-height: 35vh" :src="product.photoReview">
          <q-badge v-if="isNew" color="red" style="font-family: Actor" align="top">NEW</q-badge>
          <q-btn outline class="absolute-bottom-right q-mb-xs q-mr-xs"
                 round color="red" @click="addFavourite" >
            <q-tooltip>
              Your {{ favourite ? 'like' : 'don\'t like'}} this one
            </q-tooltip>
            <q-icon v-if="!favourite" color="red" name="favorite_border"/>
            <q-icon v-if="favourite" color="red" name="favorite"/>
          </q-btn>
          <q-btn @click="go(`/product/${product.idProduct}`)" class="absolute-bottom-left q-mb-xs q-mr-xs"
                 icon="loupe"
                 round color="dark">
            <q-tooltip>
              Show product details
            </q-tooltip>
          </q-btn>
          <q-btn @click="delFromRecentView" round class="absolute-top-right close-btn" color="grey-8" outline icon="close" />
        </q-img>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "CardProductViewed",
  props: {
    product: {
      require: true,
      type: Object
    }
  },
  data:() => ({
    favourite: false,
    isNew: false
  }),
  async mounted() {
    await this.fetchFavourite()
  },
  methods: {
    go (url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
    async delFromRecentView() {
      if(localStorage.getItem('recentView')) {
        let newRecent = JSON.parse(localStorage.getItem('recentView')).filter(item => {
          return item.idProduct !== this.product.idProduct
        })
        localStorage.setItem('recentView', JSON.stringify(newRecent))
        await  this.$emit('fetchRecentView',{})
      }
    },
    async addFavourite() {
      if(localStorage.getItem('favourite')) {
        //console.log(this.favourite)
        if (!this.favourite) {
          var check = 0;
          JSON.parse(localStorage.getItem('favourite')).map(item => {
            console.log("check 0",item.idProduct, this.product.idProduct)
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
.close-btn {
  display: none;
}
.card-handle:hover .close-btn {
  display: block;
}
</style>

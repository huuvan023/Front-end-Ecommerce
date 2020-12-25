<template>
  <div class="col-lg-4 col-md-6 col-xs-12 q-px-sm-sm">
    <q-card class="card-handle">
      <q-card-section class="col-12 no-padding">
        <q-img style="max-height: 35vh" :src="linkURLImage">
          <q-badge v-if="isNew" color="red" style="font-family: Actor" align="top">NEW</q-badge>
          <q-btn outline class="absolute-top-right q-mt-xs q-mr-xs"
                 round color="dark">
            <q-tooltip>
              Your {{ favourite ? 'like' : 'don\'t like'}} this one
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
          <div @click="go('/product')" class="cursor-pointer flex justify-center text-subtitle1 q-mt-xs-xs q-mt-md-sm  full-width">
            Product name
          </div>
          <div class="flex justify-center q-mt-xs-xs q-mt-md-sm full-width">
            <div class="flex text-h6 text-weight-bold q-mb-md">
              <div class="q-mx-xs">$40.00</div> -
              <div class="q-mx-xs text-red" style="text-decoration: line-through">$60.00</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="col-12 q-mb-md">
      <q-btn outline @click="addToCart" class=" full-width" label="ADD TO CART"/>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
export default {
  name: "CardProductFavourite",
  data () {
    return {
    }
  },
  methods: {
    go (url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
    addToCart() {
      this.$q.notify({
        type: 'positive',
        message: `Add item to your cart successfully!`,
        position: 'top-right',
        timeout: 1000
      })
    }
  },
  props: {
    isNew: {
      require: true,
      type: Boolean
    },
    favourite: {
      require: true,
      type: Boolean
    },
    ratingModel: {
      require: true,
      type: Number
    },
    linkURLImage: {
      require: true,
      type: String
    }
  }
}
</script>

<style scoped>
.card-handle:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all .5s;
}
</style>

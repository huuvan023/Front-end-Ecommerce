<template>
  <div @click="go('/product')" class="col-lg-4 col-md-6 col-xs-12 q-px-sm-sm">
    <q-card class="card-handle">
      <q-card-section class="col-12 no-padding">
        <q-img style="max-height: 35vh" :src="linkURLImage">
          <q-badge v-if="isNew" color="red" style="font-family: Actor" align="top">NEW</q-badge>
          <q-btn outline class="absolute-bottom-right q-mb-xs q-mr-xs"
                 round color="red" @click="favourite = !favourite" >
            <q-tooltip>
              Your {{ favourite ? 'like' : 'don\'t like'}} this one
            </q-tooltip>
            <q-icon v-if="!favourite" color="red" name="favorite_border"/>
            <q-icon v-if="favourite" color="red" name="favorite"/>
          </q-btn>
          <q-btn round class="absolute-top-right close-btn" color="grey-8" outline icon="close" />
        </q-img>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "CardProductViewed",
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
  },
  methods: {
    go (url) {
      if (this.$route.path !== url) {
        this.$router.replace(url)
      }
    },
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

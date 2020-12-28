<template>
  <div>
    <div class="flex justify-between">
      <q-rating
        v-model="rate.rate"
        max="5"
        :disable="true"
        size="1.5em"
        color="black"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        no-dimming
      />
      <!--<div class="text-grey-7">
        4 days ago
      </div>-->
    </div>
    <div class="q-mt-sm">
      {{ rate.comment }}
    </div>
    <q-separator inset class="q-my-md"/>
  </div>
</template>

<script>
export default {
  name: "UserComment",
  data () {
      return {
        totalRating: 1.5
      }
  },
  props:{
    rate: {
      type:Object,
      require: true
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <div class="flex justify-between">
      <q-rating
        v-model="totalRating"
        max="5"
        size="1.5em"
        color="black"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        no-dimming
      />
      <div class="text-grey-7">
        4 days ago
      </div>
    </div>
    <div class="q-mt-sm">
      This is user comment
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
  }
}
</script>

<style scoped>

</style>

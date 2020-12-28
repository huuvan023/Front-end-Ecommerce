<template>
  <div class="row col-12">
    <div class="col-md-11 col-xs-12 row q-mx-auto q-pa-md q-mb-md" style="border: 1px solid lightgrey">
      <div class="col-12">
        <q-icon name="redeem" size="lg"/>
      </div>
      <div class="text-h4 q-my-md text-weight-bold">Gift and Vouchers</div>
    </div>
    <div v-if="!hasData" class="col-md-11 col-xs-12 q-mx-auto q-pa-md q-mb-md text-center"
         style="font-family: Actor;border: 1px solid lightgrey" >
      <div>
        <q-icon name="redeem" size="lg"/>
      </div>
      <div class="text-uppercase text-weight-bold text-subtitle1">You have no gift and vouchers yet</div>
      <p class="q-my-md">
        You currently have no vouchers linked to your account. You can get some gift and vouchers from us in some special day.
      </p>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'

export default {
  name: "GiftNVouchers",
  data:() => ({
    hasData: false
  })
}
</script>

<style scoped>

</style>

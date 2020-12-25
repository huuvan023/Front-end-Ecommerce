<template>
  <div class="row col-12">
    <div class="col-11 row q-mx-auto q-mb-md">
      <q-breadcrumbs class="col-12 q-my-md-md q-my-xs-sm">
        <q-breadcrumbs-el to="/" label="Home" />
        <q-breadcrumbs-el label="Cart" />
      </q-breadcrumbs>
      <q-separator/>
    </div>
    <div class="col-md-8 row q-mx-auto q-mb-xl">
      <div class="col-md-8 col-sm-8 q-mx-auto  q-pa-sm">
        <div class="col-12 q-mx-xs q-pa-md shadow-1 overflow-auto">
          <div class="text-h6 text-weight-bold col-12">YOUR CART</div>
          <q-separator class="q-my-md"/>
          <CardProductCart/>
          <q-separator/>
          <CardProductCart/>
          <q-separator/>
          <CardProductCart/>
          <q-separator/>
          <CardProductCart/>
          <q-separator/>
          <CardProductCart/>
        </div>
      </div>
      <div class="col-md-4 col-sm-8 q-mx-auto q-pa-sm">
        <div class="col-12 q-mx-xs q-pa-md shadow-1 overflow-auto">
          <div class="text-h6 text-weight-bold col-12">TOTAL</div>
          <q-separator class="q-my-md"/>
          <div class="col-12 q-my-xs flex items-center">
            <div class="text-subtitle1 text-weight-bold">Sub-total</div>
            <div class="q-ml-auto text-h6 text-blue-grey-8">$30.00</div>
          </div>
          <div class="col-12 q-mt-md flex items-center">
            <div class="text-subtitle1 text-weight-bold">Delivery</div>
            <q-icon class="q-ml-auto cursor-pointer text-blue-grey-8" size="sm" name="help_outline">
              <q-tooltip>
                Your delivery cost will base on delivery method your selected
              </q-tooltip>
            </q-icon>
          </div>
          <q-select class="q-mb-md no-padding no-margin text-blue-grey-8 col-12" v-model="delivery" :options="deliveryOpt" />
          <q-btn @click="openModalPayment = true"
                 class="q-mt-md full-width text-weight-bold text-white bg-green-9 q-py-xs"
                 style="font-family: Actor" label="CHECK OUT" />
          <q-dialog v-model="openModalPayment" full-width position="top">
            <Pay @closeModal="openModalPayment = false" :dialog="openModalPayment" />
          </q-dialog>
          <div class="col-12 q-mt-sm text-blue-grey-8">
            Got a discount code? Add it in the next step.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
import CardProductCart from "components/CardProductCart";
import Pay from "components/Pay";

export default {
  name: "Cart",
  data() {
    return {
      deliveryOpt: [
        {
          label: 'Normal Delivery ($15.00)',
          value: 'Normal'
        },
        {
          label: 'Express Delivery ($30.00)',
          value: 'Express'
        }
      ],
      delivery: {
        label: 'Normal Delivery ($15.00)',
        value: 'Normal'
      },
      openModalPayment: false
    }
  },
  components: {CardProductCart,Pay}
}
</script>

<style scoped>
.numMod {
  user-select: none;
  padding: 0 12px;
  cursor: pointer;
  border: 1px solid grey;
}
.numMod:hover {
  background-color: #EEEEEE;
}
</style>

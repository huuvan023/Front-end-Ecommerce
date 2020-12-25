<template>
  <div class="col-12 card-root q-my-md row">
    <div class="col-3 flex items-center justify-center">
      <q-img src="/products/product4.png" alt=""/>
    </div>
    <div class="col-8 q-my-sm">
      <div class="col-12 q-ml-sm text-h6 text-weight-bold">
        $30.00
      </div>
      <div class="col-12 q-ml-sm text-subtitle1">
        Columbia Klamath Range II half zip fleece in grey
      </div>
      <div class="content-card col-12 q-ml-sm q-mt-xs  text-subtitle2 flex">
        <div>
          Grey
        </div>
        <q-separator vertical class="q-mx-md" inset/>
        <div>
          Size L
        </div>
      </div>
      <div class="col-12 content-card q-ml-sm q-mt-sm text-subtitle2 flex">
        Quantity:
        <q-btn class="q-mx-md-md q-mx-xs-xs" @click="editQuan('sub')" icon="add" outline size="xs"/>
        {{ quantity }}
        <q-btn class="q-mx-md-md q-mx-xs-xs" @click="editQuan('add')" icon="remove" outline size="xs"/>
      </div>
    </div>
    <div class="col-1 flex">
      <q-icon name="close" class="q-mt-sm q-mr-sm q-ml-auto cursor-pointer" size="md" />
    </div>
  </div>
</template>

<script>
import 'quasar/dist/quasar.addon.css'
export default {
  name: "CardProductCart",
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    editQuan(type) {
      if (type === 'sub') {
        if (this.quantity > 0) {
          this.quantity --;
        }
      }
      if (type === 'add') {
        if (this.quantity < 10) {
          this.quantity ++;
        }
      }
    }
  },
}
</script>

<style scoped>
.card-root {
  font-family: Actor;
}
.content-card {
  color: grey;
}
</style>

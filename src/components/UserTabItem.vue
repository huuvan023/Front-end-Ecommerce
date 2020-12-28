<template>
  <q-item :class="data.active ? 'active-tab' : ''"
          @click="$emit('goURL', data.userTabCheck)"
          clickable v-ripple>
    <div class="q-ma-xs flex">
      <q-item-section avatar>
        <q-avatar color="dark" text-color="white" :icon="data.icon" />
      </q-item-section>
      <q-item-section>{{ data.text }}</q-item-section>
    </div>
  </q-item>
</template>

<script>
export default {
  name: "UserTabItem",
  methods:{
  },
  props: {
    userTabCurrent: {
      require: true,
      type: String
    },
    data: {
      require: true,
      type: Object
    }
  }
}
</script>

<style scoped>

</style>

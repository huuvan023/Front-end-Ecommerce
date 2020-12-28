<template>
  <div>
    <div class="text-center flex " v-if="currentTime">
      <span class="q-mx-sm responsive-text" v-if="days">
        <div>{{ days }}</div>
        <div>days</div>
      </span>
      <q-separator vertical/>
      <span class="q-mx-sm responsive-text" v-if="!days">
        <div>00</div>
        <div>hours</div>
      </span>
      <q-separator v-if="!days" vertical/>

      <span class="q-mx-sm responsive-text" v-if="hours">
        <div>{{ hours | formatTime }}</div>
        <div>hours</div>
      </span>
      <q-separator vertical/>
      <span class="q-mx-sm responsive-text" v-if="!hours">
        <div>00</div>
        <div>hours</div>
      </span>
      <q-separator v-if="!hours" vertical/>

      <span class="q-mx-sm responsive-text" v-if="minutes">
        <div>{{ minutes | formatTime }}</div>
        <div>minutes</div>
      </span>
      <q-separator vertical/>
      <span class="q-mx-sm responsive-text" v-if="!minutes">
        <div>00</div>
        <div>minutes</div>
      </span>
      <q-separator v-if="!minutes" vertical/>

      <span class="q-mx-sm responsive-text" v-if="seconds">
        <div>{{ seconds | formatTime }}</div>
        <div>minutes</div>
      </span>
      <span class="q-mx-sm responsive-text" v-if="!seconds">
        <div>00</div>
        <div>minutes</div>
      </span>

    </div>
    <div class="text-center" v-if="!currentTime">
      Time's sale expire !!!
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    deadline: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      currentTime: Date.parse(this.deadline) - Date.parse(new Date())
    };
  },
  mounted() {
    console.log(this.deadline)
    setTimeout(this.countdown, 1000);
  },
  computed: {
    seconds() {
      return Math.floor((this.currentTime / 1000) % 60);
    },
    minutes() {
      return Math.floor((this.currentTime / 1000 / 60) % 60);
    },
    hours() {
      return Math.floor((this.currentTime / (1000 * 60 * 60)) % 24);
    },
    days() {
      return Math.floor(this.currentTime / (1000 * 60 * 60 * 24));
    }
  },
  filters: {
    formatTime(value) {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    }
  },
  methods: {
    countdown() {
      this.currentTime = Date.parse(this.deadline) - Date.parse(new Date());
      if (this.currentTime > 0) {
        setTimeout(this.countdown, this.speed);
      } else {
        this.currentTime = null;
      }
    }
  }
}
</script>
<style scoped>

  .responsive-text {
    font-size: 20px;
  }
@media screen and (min-width: 320px) {
  .responsive-text {
    font-size: calc(10px + 8 * ((100vw - 320px) / 960));
  }
}
</style>

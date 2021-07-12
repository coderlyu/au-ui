<template>
  <div ref="rollWrapper" class="roll-wrapper">
    <div ref="rollContent" class="roll-content" :style="{animation: rollOrigin}">
      <span v-if="message" :style="propStyle">{{message}}</span>
      <div v-if="html" v-html="html"></div>
    </div>
    <div v-if="roll" class="roll-content" :style="{animation: rollCopy}">
      <span v-if="message" :style="propStyle">{{message}}</span>
      <div v-if="html" v-html="html"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Roll',
  props: {
    html: {
      type: String,
      default: ''
    },
    propStyle: {
      type: [String, Object],
      default: ''
    },
    message: {
      type: [String, Number],
      default: ''
    },
    speed: {
      type: Number,
      default: 4
    },
    timingFunction: {
      type: String,
      default: 'linear'
    },
    interval: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    rollOrigin () {
      const animationStyleDefault = 'rollOrigin ' + this.duration + ' infinite ' + this.timingFunction
      const animationStyleInterval = 'rollOriginInterval ' + this.duration + ' infinite ' + this.timingFunction

      const animation = this.interval ? animationStyleInterval : animationStyleDefault
      return this.roll ? animation : ''
    },
    rollCopy () {
      const animationStyleDefault = 'rollCopy ' + this.duration + ' infinite ' + this.timingFunction
      const animationStyleInterval = 'rollCopyInterval ' + this.duration + ' infinite ' + this.timingFunction

      const animation = this.interval ? animationStyleInterval : animationStyleDefault
      return this.roll ? animation : ''
    }
  },
  data () {
    return {
      duration: 3,
      roll: false
    }
  },
  watch: {
    message () {
      this.$nextTick(this.calcWidth)
    }
  },
  methods: {
    calcWidth () {
      const wrapperWidth = this.$refs.rollWrapper.offsetWidth
      const width = this.$refs.rollContent.offsetWidth

      this.roll = wrapperWidth < width
      this.duration = (width * this.speed * 0.01).toFixed(1) + 's'
      this.duration = this.duration < 1 ? 1 : this.duration
    },
    refresh () {
      this.$nextTick(this.calcWidth)
    }
  },
  mounted () {
    this.calcWidth()
  }
}
</script>

<style lang="scss" scoped>
.roll-wrapper {
  overflow: hidden;
  display: flex;
  line-height: 1.4;

  .roll-content {
    display: inline-block;
    white-space: nowrap;
  }

  .align-center{
    margin: 0 auto;
  }

  .roll-content:first-child {
    transform: translateX(0%);
  }
  .roll-content:nth-child(2) {
    transform: translateX(40px);
  }
}
</style>
<style lang="scss">
@keyframes rollOrigin {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - 40px));
  }
}

@keyframes rollCopy {
  0% {
    transform: translateX(40px);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes rollOriginInterval {
  0% {
    transform: translateX(0);
  }
  70% {
    transform: translateX(calc(-100% - 40px));
  }
  100% {
    transform: translateX(calc(-100% - 40px));
  }
}

@keyframes rollCopyInterval {
  0% {
    transform: translateX(40px)
  }
  70% {
    transform: translateX(-100%)
  }

  100% {
    transform: translateX(-100%)
  }
}
</style>

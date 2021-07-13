<style scoped>
  .banner {
    text-align: center;
  }
  .banner-desc {
    padding-top: 50px;

    h1 {
      font-size: 34px;
      margin: 0;
      line-height: 48px;
      color: #555;
    }

    p {
      font-size: 18px;
      line-height: 28px;
      color: #888;
      margin: 10px 0 5px;
    }
  }
  .sponsors {
    display: flex;
    justify-content: center;
  }
  .sponsor {
    margin: 0 20px 50px;
    display: inline-flex;
    width: 300px;
    height: 100px;
    justify-content: center;

    img {
      margin-right: 20px;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    p {
      margin: 0;
      line-height: 1.8;
      color: #999;
      font-size: 14px;
    }
  }
  .jumbotron {
    width: 890px;
    margin: 30px auto;
    position: relative;
    img {
      width: 100%;
    }
    .jumbotron-red {
      transition: height .1s;
      background: #FFF;
      position: absolute;
      left: 0;
      top:0;
      overflow: hidden;
    }
  }
  @media (max-width: 1140px) {
    .banner .container {
      width: 100%;
      box-sizing: border-box;
    }
    .banner img {
      right: 0;
    }
  }

  @media (max-width: 1000px) {
    .banner .container {
      img {
        display: none;
      }
    }
    .jumbotron {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .banner-stars {
      display: none;
    }
    .banner-desc {
      #line2 {
        display: none;
      }
      h2 {
        font-size: 32px;
      }
      p {
        width: auto;
      }
    }
  }
</style>
<template>
  <div>
    <div class="banner">
      <div class="banner-desc">
        <h1>网站快速成型工具</h1>
        <p>基于 Vue 2.0 的桌面端组件库</p>
      </div>
    </div>
    <div class="jumbotron" ref="indexMainImg">
      <div class="jumbotron-red" :style="{
           height: mainImgOffset + 'px'
         }">
      </div>
    </div>
  </div>
</template>
<script>
import throttle from 'throttle-debounce/throttle'

export default {
  created () {
    this.throttledHandleScroll = throttle(10, true, index => {
      this.handleScroll(index)
    })
  },
  methods: {
    handleScroll (index) {
      const ele = this.$refs.indexMainImg
      const rect = ele.getBoundingClientRect()
      const eleHeight = ele.clientHeight + 55
      let calHeight = (180 - rect.top) * 2
      if (calHeight < 0) calHeight = 0
      if (calHeight > eleHeight) calHeight = eleHeight
      this.mainImgOffset = calHeight
    }
  },
  data () {
    return {
      mainImgOffset: 0
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.throttledHandleScroll)
  },
  mounted () {
    window.addEventListener('scroll', this.throttledHandleScroll)
  }
}
</script>

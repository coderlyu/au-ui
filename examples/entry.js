import Vue from 'vue'
import entry from './app.vue'
import VueRouter from 'vue-router'
import ElementUI from './plugins'
import Element from 'main/index.js'
import hljs from 'highlight.js'
import routes from './route.config'
import demoBlock from './components/demo-block'
import MainFooter from './components/footer'
import MainHeader from './components/header'
import SideNav from './components/side-nav'
import FooterNav from './components/footer-nav'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/common.css'
import './assets/styles/fonts/style.css'

Vue.use(ElementUI)
Vue.use(Element)
Vue.use(VueRouter)
Vue.component('demo-block', demoBlock)
Vue.component('main-footer', MainFooter)
Vue.component('main-header', MainHeader)
Vue.component('side-nav', SideNav)
Vue.component('footer-nav', FooterNav)

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})

router.afterEach(route => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
  document.title = 'MY-UI'
})

new Vue({
  render: h => h(entry),
  router
}).$mount('#app')

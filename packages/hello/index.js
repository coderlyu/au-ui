import AuHello from './src/index.vue'

/* istanbul ignore next */
AuHello.install = function (Vue) {
  Vue.component(AuHello.name, AuHello)
}

export default AuHello

import ElHello from './src/index.vue'

/* istanbul ignore next */
ElHello.install = function (Vue) {
  Vue.component(ElHello.name, ElHello)
}

export default ElHello

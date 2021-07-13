import AuRoll from './src/index.vue'

/* istanbul ignore next */
AuRoll.install = function (Vue) {
  Vue.component(AuRoll.name, AuRoll)
}

export default AuRoll

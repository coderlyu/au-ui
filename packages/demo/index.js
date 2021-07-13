import AuDemo from './src/index.vue'

/* istanbul ignore next */
AuDemo.install = function (Vue) {
  Vue.component(AuDemo.name, AuDemo)
}

export default AuDemo

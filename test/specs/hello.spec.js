import { createTest, destroyVM } from '../utils'
import Hello from 'packages/hello/index.js'
import Vue from 'vue'

describe('Hello', () => {
  let vm
  afterEach(() => {
    vm && destroyVM(vm)
  })
  it('use', () => {
    Vue.use(Hello)
    expect(Vue.component(Hello.name)).to.be.a('function')
  })
  it('create', () => {
    vm = createTest(Hello, {
      title: 'test'
    }, true)
    expect(vm.$el.querySelector('h3').textContent).to.equal('test')
  })
})

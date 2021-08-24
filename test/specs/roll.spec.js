import { createTest, destroyVM } from '../utils'
import Roll from '../../packages/roll/index.js'
import Vue from 'vue'

describe('Roll', () => {
  let vm
  afterEach(() => {
    vm && destroyVM(vm)
  })
  it('use', () => {
    Vue.use(Roll)
    expect(Vue.component(Roll.name)).to.be.a('function')
  })

  it('create', () => {
    vm = createTest(Roll, {
      message: 'test'
    }, true)
    expect(vm.$el.querySelector('.roll-content div')).to.equal(null)
    expect(vm.$el.querySelector('.roll-content span').textContent).to.equal('test')
  })

  it('style', () => {
    vm = createTest(Roll, {
      message: 'test',
      propStyle: {
        lineHeight: '40px'
      }
    }, true)
    expect(vm.$el.querySelector('.roll-content div')).to.equal(null)
    expect(vm.$el.querySelector('.roll-content span').style.lineHeight).to.equal('40px')
  })
})

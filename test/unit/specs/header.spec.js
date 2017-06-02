/* global describe, it, expect */
import 'es6-promise/auto' // eslint-disable-line
import Vue from 'vue' // eslint-disable-line
import index from '@/components/Header/index' // eslint-disable-line

Vue.config.productionTip = false

describe('Header index.vue', () => {
  it('should render correct header', done => {
    const Constructor = Vue.extend(index)
    const vm = new Constructor().$mount()
    Vue.nextTick(function () {
      expect(vm.$el.textContent).to.be.equal('An official website of the United States Government  Disaster Data Portal')
      done()
    })
  })
})
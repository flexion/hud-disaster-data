import 'es6-promise/auto' // eslint-disable-line
import Vue from 'vue' // eslint-disable-line
import '@/vue-mixins'
import Vuex from 'vuex' // eslint-disable-line
import sinon from 'sinon'
import SelectLocationSideBar from '@/components/SelectLocationSideBar' // eslint-disable-line
import _ from 'lodash' // eslint-disable-line
import should from 'should'

Vue.use(Vuex)
Vue.config.productionTip = false

describe('SelectLocationSideBar component', function () {
  let store
  let mutations
  let getters

  beforeEach(function () {
    getters = {
      disasterNumberResults: function () { return [] },
      localeResults: function () { return [] }
    }
    mutations = {
      updateDisasterNumberList: sinon.stub(),
      updateLocaleList: sinon.stub()
    }

    store = new Vuex.Store({state: {}, mutations, getters})
  })

  it('should start with populated state dropdown', function (done) {
    const Constructor = Vue.extend(SelectLocationSideBar)
    const vm = new Constructor({store}).$mount()
    Vue.nextTick(() => {
      expect(vm.states.length).to.greaterThan(0)
      done()
    })
  })

  describe('changeStore', function () {
    it('should reset locales and disaster numbers if state has changed', function () {
      store = new Vuex.Store({state: {}, mutations, getters})
      const Constructor = Vue.extend(SelectLocationSideBar)
      const vm = new Constructor({store}).$mount()
      vm.stateSelected = {code: 'WI', name: 'Wisconsin'}
      vm.localeSelected = ['this place', 'that other place']
      vm.disasterSelected = ['this disaster', 'the next disaster']
      vm.changeStore({code: 'IA', name: 'Iowa'})
      Vue.nextTick(() => {
        expect(vm.stateSelected.code).to.be.equal('IA')
        expect(vm.localeSelected).to.be.null
        expect(vm.disasterSelected).to.be.null
      })
    })
  })

  describe('addLocale', function () {
    it('should add the locale', function (done) {
      store = new Vuex.Store({state: {}, mutations, getters})
      const Constructor = Vue.extend(SelectLocationSideBar)
      const vm = new Constructor({store}).$mount()
      vm.localeSelected = {name: 'Alexandria', code: 'Alexandria'}
      let commitSpy = sinon.spy(store, 'commit')
      vm.addLocale()
      Vue.nextTick(() => {
        should(commitSpy.calledWith('addLocaleFilter')).be.true()
        done()
      })
    })
    it('should do nothing if no locale is selected', function (done) {
      store = new Vuex.Store({state: {}, mutations, getters})
      const Constructor = Vue.extend(SelectLocationSideBar)
      const vm = new Constructor({store}).$mount()
      vm.localeSelected = null
      let commitSpy = sinon.spy(store, 'commit')
      vm.addLocale()
      Vue.nextTick(() => {
        should(commitSpy.calledWith('addLocaleFilter')).be.false()
        done()
      })
    })
  })
})

import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'prod'
Vue.config.debug = debug

export default new Vuex.Store({
  modules: {
    test
  },
  strict: debug
})

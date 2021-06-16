import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state,
  getters,
  actions,
  mutations,
  plugins: [
    persistedState({
      storage: window.sessionStorage,
      // reducer(val) {
      //   return {
      //     // 只储存state的two
      //     // qwer: val.one,
      //     qwer: val.one,
      //   }
      // }
    })
  ],
})

export default store
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state,
  getters,
  actions,
  mutations,
  // 具体看配置
  plugins: [
    createPersistedState({
      // key: "vuex-测试", // 更改储存名
      storage: window.sessionStorage,
      paths: ["user", "navBar"], // 设置需要持久化的数据和reducer差不多
      // reducer(val) {
      //   return {
      //     // 只储存state的user
      //     // qwer: val.one,
      //     user: val.user,
      //   }
      // }
    })
  ],
})

export default store
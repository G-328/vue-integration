import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import dayjs from 'dayjs'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store/store'
import './permission'

Vue.config.productionTip = false

Vue.prototype.$dayJs = dayjs
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios

Vue.use(Vuex)
Vue.use(ElementUI,{ size: 'small'})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
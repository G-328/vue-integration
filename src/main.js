import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import dayjs from 'dayjs'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$dayJs = dayjs
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios

Vue.use(Vuex)
Vue.use(ElementUI,{ size: 'small'})

router.beforeEach((to, from, next) => {
  
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
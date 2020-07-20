import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.prototype.$dayJs = dayjs
Vue.prototype.$echarts = echarts

Vue.use(Vuex)
Vue.use(ElementUI)

// const vm = new Vue({
//   el: '#app',
//   components: {App},
//   template: '<App />',
//   router,
// })

Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
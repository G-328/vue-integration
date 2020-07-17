import Vue from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'

Vue.config.productionTip = false

Vue.prototype.$dayJs = dayjs

new Vue({
  render: h => h(App),
}).$mount('#app')
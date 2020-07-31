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
Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')



// window.onunload = function(event) {
//   event = (event)?event:window.event;
//   if (event.clientX < 0 && event.clientY < 0 || event.altKey) {
//     console.log("关闭")
//     alert("关闭");
//     debugger
//   } else {
//     console.log("刷新")
//     alert("刷新");
//     // debugger
//   }
// };

// var agent = navigator.userAgent.toLowerCase();
// //IE
// if (agent.indexOf("msie") > 0) {
// }
// //firefox
// if (agent.indexOf("firefox") > 0) {
//   // require("@/assets/css/firefix.css");
// }
// //Chrome
// if (agent.indexOf("chrome") > 0) {
//   // require("@/assets/css/chrome.css");
// }

// window.onload = function () {
//   window.onunload = function() {
//                   if(flag){
//                       console.log('关闭操作');
//                   }
//                   else {
//                       console.log('刷新操作');
//                   }
//               };
  
//               window.onbeforeunload = function () {
//                   if(!flag){
//                       console.log('关闭操作');
//                   }
//                   else{
//                       console.log('刷新操作');
//                   }
//               };
//          }

// onload
// onunload
// onbeforeunload
  // window.onbeforeunload = function (e) {
  //   e = e || window.event;
  //   // 兼容IE8和Firefox 4之前的版本
  //   if (e) {
  //     // console.log(e)
  //     e.returnValue = '关闭提示';
  //   }
  //   // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
  //   return '关闭提示';
  // };

  // window.οnbefοreunlοad=function (event){
  //   console.log("οnbefοreunlοad")
  //   // alert("===οnbefοreunlοad===");
  //   if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){ 
  //     debugger
  //     console.log("你关闭了浏览器")
  //   // alert("你关闭了浏览器");
  //   }else{
  //     debugger
  //     console.log("你正在刷新页面")
  //   // alert("你正在刷新页面");
  //   }
  //   }

   window.onload = function() {
    // window.localStorage.setItem('sss', 111)
    window.sessionStorage.setItem("gb", 111)
    console.log("onloadqqqqqqqqqqq")
    // debugger
  };
  window.onunload = function() {
    // clearTimeout(window.cancelTime)
    console.log("onunload-----------")
    // debugger
  };
  window.onbeforeunload = function() {
    // window.localStorage.removeItem('sss')
    // console.log(object)
    if (window.sessionStorage.getItem("gb")) {
      console.log("onbeforeunload")
    }
    // window.cancelTime = 
    // setTimeout(() => {
    //   // console.log("!1ss")
    // localStorage.removeItem('sss')
    // // console.log(window.localStorage.removeItem('sss'))
    // }, 1000);
    console.log("objonbeforeunloadect")
    debugger
  };
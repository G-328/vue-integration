import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'

import DayJs from '@/components/pages/DayJs.vue'
import RichTextEditor from '@/components/pages/RichTextEditor.vue'
import dragLX from '@/components/pages/dragLX.vue'

Vue.use(Router)

// 可解决重复点击报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  // mode: "history", //模式
  routes: [
    {
      path: "/Login",
      name: "登录",
      component: Login
    },
    {
      path: "/Home",
      name: "首页",
      component: Home,
      children: [
        {
          path: "/RichTextEditor",
          name: "富文本编辑器",
          component: RichTextEditor
        },
        {
          path: "/dragLX",
          name: "拖拽",
          component: dragLX
        },
      ]
    },
  ]
})
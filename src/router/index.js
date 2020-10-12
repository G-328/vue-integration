import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'

import DayJs from '@/components/pages/DayJs.vue'
import RichTextEditor from '@/components/pages/RichTextEditor.vue'
import dragLX from '@/components/pages/dragLX.vue'

// 娱乐
import music from '@/components/pages/entertainment/music.vue'
import movie from '@/components/pages/entertainment/movie.vue'

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
      path: "/login",
      name: "登录",
      component: Login
    },
    {
      path: "/home",
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
        {
          path: "/music",
          name: "音乐",
          component: music
        },
        {
          path: "/movie",
          name: "电影",
          component: movie
        },
      ]
    },
  ]
})
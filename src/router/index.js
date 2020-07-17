import Vue from 'vue';
import Router from 'vue-router';

import DayJs from '@/components/pages/DayJs.vue'
import RichTextEditor from '@/components/pages/RichTextEditor.vue'

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
      path: "/DayJs",
      name: "DayJs",
      component: DayJs
    },
    {
      path: "/RichTextEditor",
      name: "RichTextEditor",
      component: RichTextEditor
    },
  ]
})
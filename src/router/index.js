import Vue from 'vue';
import Router from 'vue-router';

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
      component: () => import('@/components/pages/login')
    },
    {
      path: "/home",
      component: () => import('@/components/pages/home'),
      children: [
        {
          path: "homePage",
          name: "主页",
          component: () => import('@/components/pages/personalCenter/homePage'),
        },
        {
          path: "statistical",
          name: "统计",
          component: () => import('@/components/pages/personalCenter/statistical'),
        },
        {
          path: "editor",
          name: "编辑器",
          component: () => import('@/components/pages/editor/RichTextEditor'),
        },
        {
          path: "date",
          name: "时间",
          component: () => import('@/components/pages/date/DayJs'),
        },
        {
          path: "dataView",
          name: "数据可视化",
          component: () => import('@/components/pages/dataView/index'),
        },
        {
          path: "entertainment",
          name: "娱乐",
          component: () => import('@/components/pages/entertainment'),
          children: [
            {
              path: "game",
              name: "游戏",
              component: () => import('@/components/pages/entertainment/game'),
            },
            {
              path: "music",
              name: "音乐",
              component: () => import('@/components/pages/entertainment/music'),
            },
            {
              path: "movie",
              name: "电影",
              component: () => import('@/components/pages/entertainment/movie'),
            },
            {
              path: "TVseries",
              name: "TVseries",
              component: () => import('@/components/pages/entertainment/TVseries'),
            },
          ]
        },
      ]
    },
    {
      path: "/404",
      name: "404",
      component: () => import('@/components/common/404')
    },
    { 
      path: '*',
      redirect: '/404',
    }
  ]
})
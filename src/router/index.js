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
      component: () => import('@/components/pages/login'),
      hidden: true
    },
    {
      path: "/home",
      component: () => import('@/components/pages/layout'),
      redirect: '/home/homePage',
      children: [
        {
          path: "homePage",
          name: "主页",
          component: () => import('@/components/pages/personalCenter/homePage'),
          meta: { title: '主页', icon: 'dengPao' }
        },
        {
          path: "statistical",
          name: "统计",
          component: () => import('@/components/pages/personalCenter/statistical'),
          meta: { title: '统计', icon: 'dengPao' }
        },
        {
          path: "editor",
          name: "编辑器",
          component: () => import('@/components/pages/editor/RichTextEditor'),
          meta: { title: '编辑器', icon: 'dengPao', }
        },
        {
          path: "date",
          name: "时间",
          component: () => import('@/components/pages/date/DayJs'),
          meta: { title: '时间', icon: 'dengPao', }
        },
        {
          path: "dataView",
          name: "数据可视化",
          component: () => import('@/components/pages/dataView/index'),
          meta: { title: '数据可视化', icon: 'dengPao', }
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
              meta: { title: 'Dashboard', }
            },
            {
              path: "music",
              name: "音乐",
              component: () => import('@/components/pages/entertainment/music'),
              meta: { title: 'Dashboard', }
            },
            {
              path: "movie",
              name: "电影",
              component: () => import('@/components/pages/entertainment/movie'),
              meta: { title: 'Dashboard', }
            },
            {
              path: "TVseries",
              name: "TVseries",
              component: () => import('@/components/pages/entertainment/TVseries'),
              meta: { title: 'Dashboard', }
            },
          ]
        },
      ]
    },
    {
      path: "/404",
      name: "404",
      component: () => import('@/components/common/404'),
      hidden: true
    },
    { 
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
})
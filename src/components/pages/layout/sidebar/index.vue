<template>
  <div>
    <lo-go v-if="true" :collapse="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        mode="vertical"
        :default-active="activeMenu"
        background-color="rgba(48, 65, 86)"
        text-color="rgb(191, 203, 217)"
        :collapse="isCollapse"
        @select="handleSelect"
      >
        <sidebar-item
          v-for="(item, index) in urls"
          :key="index.path"
          :item="item"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './sidebarItem'
import logo from './logo'
export default {
  name: 'Sidebar',
  components: {
    "lo-go": logo,
    SidebarItem
  },
  data() {
    return {
      urls: [
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
          path: "/login",
          name: "登录",
          component: () => import('@/components/pages/login'),
          hidden: true,
          meta: { title: '登录', icon: 'dengPao' }
        },
        {
          path: "/home",
          component: () => import('@/components/pages/layout'),
          redirect: '/home/homePage',
          meta: { title: 'home', icon: 'dengPao' },
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
          hidden: true,
                  meta: { title: 'Dashboard', }

        },
        { 
          path: '*',
          redirect: '/404',
          hidden: true,
                  meta: { title: 'Dashboard', }

        }
      ]
    }
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log("object")
      // this.$store.commit()
      console.log(key, keyPath);
    },
  },
  computed: {
    activeMenu() {
      return this.$route.path
    },
    isCollapse() {
      return !this.$store.state.sidebar.opened
    }
  },
}
</script>

<style lang="less" scoped>

</style>
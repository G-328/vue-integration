<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        mode="vertical"
        :default-active="activeMenu"
        background-color="rgba(48, 65, 86)"
        text-color="rgb(191, 203, 217)"
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
export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  data() {
    return {
      urls: [
        {
          path: "/home/homePage",
          name: "主页",
          id: "path1",
          children: []
        },
        {
          path: "/home/statistical",
          name: "统计",
          id: "path2",
          children: []
        },
        {
          path: "/home/editor",
          name: "编辑器",
          id: "path3",
          children: []
        },
        {
          path: "/home/date",
          name: "时间",
          id: "path4",
          children: []
        },
        {
          path: "/home/dataView",
          name: "数据可视化",
          id: "path5",
          children: []
        },
        {
          path: "/home/entertainment",
          name: "娱乐天地",
          id: "path6",
          children: [
            {
              path: "/home/entertainment/game",
              name: "游戏",
              id: "youxi",
              children: []
            },
            {
              path: "/home/entertainment/music",
              name: "音乐",
              id: "yinyue",
              children: []
            },
            {
              path: "/home/entertainment/movie",
              name: "电影",
              id: "dianying",
              children: []
            },
            {
              path: "/home/entertainment/TVseries",
              name: "电视剧",
              id: "dianshiju",
              children: []
            },
          ]
        },
        {
          path: "55",
          name: "随意了",
          id: "path3",
          children: []
        },
        {
          path: "q",
          name: "相关",
          id: "path2",
          children: [
            {
              path: "w",
              name: "影视",
              id: "yingshi",
              children: []
            },
            {
              path: "e",
              name: "音乐",
              id: "yinyue",
              children: []
            },
          ]
        },
        {
          path: "r",
          name: "娱乐",
          id: "path2",
          children: [
            {
              path: "t",
              name: "影视",
              id: "yingshi",
              children: []
            },
            {
              path: "y",
              name: "音乐",
              id: "yinyue",
              children: [
                {
                  path: "u",
                  name: "影视",
                  id: "yingshi",
                  children: []
                },
                {
                  path: "i",
                  name: "音乐",
                  id: "yinyue",
                  children: []
                },
              ]
            },
          ]
        },
        {
          path: "r",
          name: "娱乐",
          id: "path2",
          children: [
            {
              path: "t",
              name: "影视",
              id: "yingshi",
              children: []
            },
            {
              path: "y",
              name: "音乐",
              id: "yinyue",
              children: [
                {
                  path: "u",
                  name: "影视",
                  id: "yingshi",
                  children: []
                },
                {
                  path: "i",
                  name: "音乐",
                  id: "yinyue",
                  children: []
                },
              ]
            },
          ]
        },
        {
          path: "r",
          name: "娱乐",
          id: "path2",
          children: [
            {
              path: "t",
              name: "影视",
              id: "yingshi",
              children: []
            },
            {
              path: "y",
              name: "音乐",
              id: "yinyue",
              children: [
                {
                  path: "u",
                  name: "影视",
                  id: "yingshi",
                  children: []
                },
                {
                  path: "i",
                  name: "音乐",
                  id: "yinyue",
                  children: []
                },
              ]
            },
          ]
        },
        {
          path: "r",
          name: "娱乐",
          id: "path2",
          children: [
            {
              path: "t",
              name: "影视",
              id: "yingshi",
              children: []
            },
            {
              path: "y",
              name: "音乐",
              id: "yinyue",
              children: [
                {
                  path: "u",
                  name: "影视",
                  id: "yingshi",
                  children: []
                },
                {
                  path: "i",
                  name: "音乐",
                  id: "yinyue",
                  children: []
                },
              ]
            },
          ]
        },
      ],
    }
  },
  mounted() {},
  computed: {
    activeMenu() {
      console.log(this.$route.path)
      return this.$route.path
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("object")
      console.log(key, keyPath);
    },
  },
}
</script>

<style lang="less" scoped>
  
</style>
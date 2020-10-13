<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-demo"
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
      activeIndex: '1',
      urls: [
        {
          path: "/home",
          name: "主页",
          id: "path1",
          children: []
        },
        {
          path: "22",
          name: "娱乐相关",
          id: "path2",
          children: [
            {
              path: "33",
              name: "影视",
              id: "yingshi",
              children: []
            },
            {
              path: "44",
              name: "音乐",
              id: "yinyue",
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
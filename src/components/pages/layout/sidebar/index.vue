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
import logo from './logo'
import SidebarItem from './sidebarItem'

export default {
  name: 'Sidebar',
  components: {
    "lo-go": logo,
    "sidebar-item": SidebarItem
  },
  data() {
    return {
      // urls: [],
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
    urls() {
      // console.log("object",this.$router.options.routes.filter(item => !item.hidden))
      return this.$router.options.routes.filter(item => !item.hidden)[0].children
    },
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
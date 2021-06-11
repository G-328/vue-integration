<template>
  <div class="sidebar-container">
    <!-- 没有子菜单 -->
    <!-- <template v-if="item.children && item.children.length === 0"> -->
    <!-- <template v-if="hasOneShowingChild(item)"> -->
    <template v-if="false">
      <!-- <el-menu-item  @click="addNavList(item)" :index="item.path">{{item.name}}</el-menu-item> -->
      <el-menu-item  @click="addNavList(item)" :index="item.path">
        <Item :icon="item.meta && item.meta.icon" :title="item.meta.title"></Item>
      </el-menu-item>
    </template>

    <!-- 有子菜单 -->
    <template v-else>
      <el-submenu :index="item.path">
        <!-- <template slot="title">{{item.name}}</template> -->
        <template slot="title">
          <Item :icon="item.meta && item.meta.icon" :title="item.meta.title"></Item>
          <!-- <Item icon="dengPao" title="哈哈哈"></Item> -->
        </template>
        <sidebar-item
          v-for="item in item.children"
          :key="item.path"
          :item="item"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
import Item from './item'
export default {
  name: 'SidebarItem',
  components: {
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    addNavList(item) {
      console.log(item, "--=======---")
      this.$store.commit("SET_NAVLIST", {
        key: item,
        status: "add"
      })
    },
    hasOneShowingChild(item) {

    }
  },
}
</script>

<style lang="less" scoped>
  /deep/.el-menu {
    background-color: #1f2d3d !important;
  }
  .el-menu-item {
    &:hover {
      background-color: #263445 !important;
    }
  }
  .el-menu-item.is-active {
    &:focus {
      background-color: #1f2d3d !important;
    }
  }
  /deep/.el-submenu__title {
    &:hover {
      background-color: #263445 !important;
    }
  }
</style>
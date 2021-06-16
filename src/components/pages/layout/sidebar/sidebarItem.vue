<template>
  <div v-if="!item.hidden">
    <!-- 没有子菜单 -->
    <template v-if="hasOneShowingChild(item)">
    <!-- <template v-if="false"> -->
      <el-menu-item :index="item.path">
        <Item :icon="item.meta && item.meta.icon" :title="item.meta.title"></Item>
      </el-menu-item>
    </template>

    <!-- 有子菜单 -->
    <!-- <template v-else> -->
      <el-submenu v-else ref="subMenu" :index="item.path" popper-append-to-body>
        <template slot="title">
          <Item :icon="item.meta && item.meta.icon" :title="item.meta.title"></Item>
        </template>
        <sidebar-item
          v-for="item in item.children"
          :key="item.path"
          :item="item"
        />
      </el-submenu>
    <!-- </template> -->
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
    hasOneShowingChild(item) {
      if (item.children === undefined || item.children.length === 0) {
        return true
      }
      return false
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
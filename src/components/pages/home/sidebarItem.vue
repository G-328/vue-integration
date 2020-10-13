<template>
  <div class="sidebar-container">
    <!-- 没有子菜单 -->
    <template v-if="item.children.length === 0">
      <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
    </template>

    <!-- 有子菜单 -->
    <template v-else>
      <el-submenu :index="item.path">
        <template slot="title">{{item.name}}</template>
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
export default {
  name: 'SidebarItem',
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
  methods: {},
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
<template>
  <div class="home-container" :class="{'is-opened': !sidebar.opened}">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div class="setting">
        <div>
          <span>是否固定头部</span>
          <el-switch
            @change="fixedHeaderC"
            :value="fixedHeader"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </div>
        <div>
          <span>是否启用导航条</span>
          <el-switch
            @change="navBarC"
            :value="navBar"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </div>
      </div>
      <top-nav
        class="main-top"
      />
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from './sidebar'
import TopNav from './topNav'
export default {
  name: 'Home',
  components: {
    Sidebar,
    TopNav
  },
  data() {
    return {
      arr: []
    }
  },
  computed: {
    ...mapState({
      fixedHeader: state => state.fixedHeader,
      sidebar: state => state.sidebar,
      navBar: state => state.navBar,
    }),
  },
  methods: {
    fixedHeaderC() {
      this.$store.commit("SET_FIXEDHEADER")
    },
    navBarC() {
      this.$store.commit("SET_NAVBAR")
    },
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
@import "@/assets/less/common.less";

  .home-container {
    width: 100%;
    height: 100%;
    display: flex;

    .sidebar-container {
      width: @sidebarWidth;
      height: 100%;
      background-color:rgb(48, 65, 86);
      position: fixed;
    }

    .main-container {
      width: calc(100% - @sidebarWidth);
      height: 100%;
      margin-left: @sidebarWidth;
      position: relative;

      .main-top {
        width: 100%;
      }

      .main-content {
        width: 100%;
        background-color: #f0f2f5;
      }
    }
  }

  .is-opened {
    .sidebar-container {
      width: @shrinkSidebarWidth;
    }

    .main-container {
      width: calc(100% - @shrinkSidebarWidth);
    }
  }

  .setting {
    width: 200px;
    height: 200px;
    position: absolute;
    background: pink;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
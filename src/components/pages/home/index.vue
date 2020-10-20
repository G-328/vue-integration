<template>
  <div
    class="home-container"
    :class="{'is-opened': !sidebar.opened}"
  >
    <sidebar class="sidebar-container"/>
    <div
      class="main-container"
      :class="{'is-fixed': fixedHeader}"
    >
      <div class="setting">
        <div>
          <span class="setting-title">固定头部</span>
          <el-switch
            v-model="fixedHeader"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </div>
        <div>
          <span class="setting-title">导航条</span>
          <el-switch
            v-model="navBar"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </div>
      </div>
      <top-nav class="main-top"/>
      <div
        class="main-content"
        :class="{'is-navbar': !navBar}"
      >
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
    return {}
  },
  computed: {
    ...mapState({
      sidebar: state => state.sidebar
    }),
    fixedHeader: {
      get() {
        return this.$store.state.fixedHeader
      },
      set(val) {
        this.$store.commit("SET_FIXEDHEADER", val)
      }
    },
    navBar: {
      get() {
        return this.$store.state.navBar
      },
      set(val) {
        this.$store.commit("SET_NAVBAR", val)
      }
    },
  },
  methods: {},
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
        background-color: #fff;
        border-bottom: 1px solid gray
      }

      .main-content {
        width: 100%;
        background-color: #f0f2f5;
      }
    }

    .is-fixed {
      .main-top {
        width: calc(100% - @sidebarWidth);
        position: fixed;
        top: 0;
        right: 0;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
        border-bottom: none;
      }

      .main-content {
        margin-top: 84px;
      }
      
      .is-navbar {
        margin-top: 50px;
      }
    }
  }

  .is-opened {
    .sidebar-container {
      width: @shrinkSidebarWidth;
    }

    .main-container {
      width: calc(100% - @shrinkSidebarWidth);
      margin-left: @shrinkSidebarWidth;
    }

    .is-fixed {
      .main-top {
        width: calc(100% - @shrinkSidebarWidth);
      }
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
    .setting-title {
      width: 100px;
      background: blue;
    }
  }
</style>
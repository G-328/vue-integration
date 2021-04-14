<template>
  <div
    class="home-container"
    :class="{'is-opened': !sidebar.opened}"
  >
    <!-- 侧边菜单 -->
    <side-bar class="sidebar-container"/>
    <!-- 右侧 -->
    <div
      class="main-container"
      :class="{'is-fixed': fixedHeader}"
    >
      <topn-av class="main-top"/>
      <div
        class="main-content"
        :class="{'is-navbar': !navBar}"
      >
        <router-view class="main-route"></router-view>
      </div>
    </div>

    <!-- 设置面板 -->
    <div class="setting" :class="{'setting-show': !isShowSettingSwitch}">
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
      <div class="setting-switch" @click="settingSwitch">
        <i :class="isShowSettingSwitch ? 'el-icon-caret-right' : 'el-icon-caret-left'"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import sidebar from './sidebar/index'
import topNav from './topNav/index'
export default {
  name: 'Home',
  components: {
    "side-bar": sidebar,
    "topn-av": topNav
  },
  data() {
    return {
      isShowSettingSwitch: false
    }
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
  mounted() {
    // console.log("home", window.performance, performance.timing, performance.navigation)
  },
  methods: {
    settingSwitch() {
      this.isShowSettingSwitch = !this.isShowSettingSwitch
    }
  },
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

      .main-top {
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid gray;
        z-index: 5;
      }

      .main-content {
        width: 100%;
        height: calc(100% - 84px);
        padding: 10px;
        background-color: #f0f2f5;

        .main-route {
          width: 100%;
          height: 100%;
          background: #fff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

        }
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
        min-height: calc(100% - 50px);
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
    width: 100px;
    height: 80px;
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: rgb(26, 110, 110);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 10px;
    .setting-title {
      width: 50px;
    }
    .setting-switch {
      position: absolute;
      width: 10px;
      height: 30px;
      line-height: 30px;
      left: -10px;
      background: rgba(31, 10, 10, 0.43);
      cursor: pointer;
    }
  }
  .setting-show {
    right: -100px;
  }
</style>
<template>
  <div class="home-container">
    <sidebar class="sidebar-container" />
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
          <span class="qwer">是否启用导航条</span>
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
        :class="{fixedHeader: fixedHeader}"
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
      navBar: state => state.navBar,
    })
  },
  watch: {},
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
  .home-container {
    width: 100%;
    height: 100%;
    display: flex;

    .sidebar-container {
      width: 210px;
      height: 100%;
      background-color:rgb(48, 65, 86);

      position: fixed;
    }

    .main-container {
      width: calc(100% - 210px);
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;

      margin-left: 210px;


      .setting {
        width: 200px;
        height: 200px;
        position: absolute;
        background: pink;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      .main-top {
        width: 100%;
      }

      .fixedHeader {
        // width: calc(100% - 210px);
        position: fixed;
        margin-top: 0;
        margin-right: 0;
        // top: 0;
        // left: 0;
        // right: 0;
      }

      .main-content {
        width: 100%;
        height: calc(100% - 84px);
        background-color: #f0f2f5;
        margin-top: 84px;
      }
    }
  }
</style>
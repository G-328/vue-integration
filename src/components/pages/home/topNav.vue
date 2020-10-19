<template>
  <div class="">
    <div class="details">

      <div class="details-left">
        <div class="shrinkage" @click="shrinkage">
          <i class="iconfont" :class="sidebarStatus.opened ? 'icon-shouqi' : 'icon-zhankai3'"></i>
        </div>
        <div class="pageName">
          <p>{{pageName}}</p>
        </div>
      </div>

      <div class="details-right">
        <div class="fullScreen" @click="fullScreen">
          <i class="iconfont" :class="isFullScreen ? 'icon-quanping' : 'icon-tuichuquanping1'"></i>
        </div>

        <el-dropdown class="user-menu" trigger="click">
          <div class="user-tuzi">
            <img src="@img/tuzi.gif" class="tuzi">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="nav-tags" v-show="navBar">
      diidid
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import screenfull from 'screenfull'
export default {
  name: 'TopNav',
  data() {
    return {
      isFullScreen: true
    }
  },
  computed: {
    ...mapState({
      fixedHeader: state => state.fixedHeader,
      sidebarStatus: state => state.sidebar,
      navBar: state => state.navBar,
    }),
    pageName() {
      return this.$route.name
    }
  },
  mounted() {},
  methods: {
    shrinkage() {
      this.$store.commit("SET_SIDEBAR")
    },
    fullScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '你的浏览器不支持此全屏功能',
          type: 'warning'
        })
        return false
      }
      this.isFullScreen = !this.isFullScreen
      screenfull.toggle()
    },
    outLogin() {
      this.$router.push('/login')
      sessionStorage.clear()
    }
  },
}
</script>

<style lang="less" scoped>
  .details {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(110, 108, 108, 0.3);
    display: flex;
    justify-content: space-between;

    .details-left {
      display: flex;
      align-items: center;

      .shrinkage {
        margin: 0 10px 0 10px;
      }

      .pageName {
        font-size: 16px;
      }
    }

    .details-right {
      display: flex;
      align-items: center;
      
      .user-menu {
        margin: 0 20px 0 20px;

        .user-tuzi {
          display: flex;
          align-items: flex-end;
          .tuzi {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            border-radius: 10px;
          }
        }
      }
    }
  }

  .nav-tags {
    width: 100%;
    height: 34px;
    border-bottom: 1px solid rgba(110, 108, 108, 0.9);
  }
</style>
<template>
  <div class="home">
    <el-row class="topMenu">
      <el-col class="header" :span="24">
        <h1 class="logo" @click="">LOGO</h1>
        <!--  -->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :unique-opened="true"
          @select="handleSelect"
          :collapse-transition="true"
          text-color="black"
        >
          <template v-for="(item, index) in urls">
            <el-menu-item
              v-if="item.children.length == 0"
              :index="item.path"
              :key="item.id"
            >{{item.name}}</el-menu-item>
            <el-submenu
              v-else
              :index="item.path"
              :key="item.id"
            >
              <template slot="title">{{item.name}}</template>
              <template v-for="(item1, index) in item.children">
                <el-menu-item :index="item1.path">{{item1.name}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
        <!--  -->
        <div class="information">
          等待秋天
        </div>
      </el-col>
    </el-row>
    <div class="bottomMain">
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeIndex: '1',
      urls: [
        {
          path: "11",
          name: "学习相关",
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
              id: "yingshi"
            },
            {
              path: "44",
              name: "音乐",
              id: "yinyue"
            },
          ]
        },
        {
          path: "33",
          name: "随意了",
          id: "path3",
          children: []
        },
      ],
      time: false
    }
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log("object")
      console.log(key, keyPath);
    },
    one(e) {
      console.log("one")
      console.log(e.clientY)
      // console.log(window.event.screenX)
      // console.log(window.screenLeft)
      //  window.event.screenX - window.screenLeft;
      // console.log(document.documentElement.scrollWidth)
      // console.log(e.screenTop)
      // console.log(window.screenTop)
      // console.log(window.screenLeft)
      // this.$axios.get('http://rap2.taobao.org:38080/app/mock/262184/get/user').then(res => {
      //   console.log(res)
      //   console.log(res.data.code)
      //   console.log(res.data.detail)
      //   console.log(res.data.detail.name)
      //   console.log(res.data.detail.hobby)
      //   console.log(res.data.detail.hobby[0])
      // })
      // this.time = setTimeout(() => {
      //   console.log("setTimeout")
      // }, 1000);
    }
  },
}
</script>

<style lang="less" scope>
  .home {
    width: 100%;
    height: 100%;
  }
  .topMenu {
    width: 100%;
    height: 64px;
    .header {
      width: 100%;
      height: 100%;
      background-image: url('~@assets/img/nav.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      justify-content: space-between;
      .logo {
        color: pink;
        height: 100%;
        line-height: 64px;
        margin-left: 1%;
      }
      .el-menu-demo {
        background: red;
        border-bottom: none;
        .el-menu-item:hover,.el-menu-item:focus {
          background-color: transparent;
        }
        .el-menu-item.is-active {
          border-bottom-color: transparent;
        }
        .el-submenu {
          .el-submenu__title {
            border: none;
          }
          .el-submenu__title:hover {
            background-color: transparent;
          }
        }
      }
      .information {
        background: pink;
        height: 100%;
        line-height: 64px;
        margin-right: 1%;
        background:-webkit-linear-gradient(90deg,#ACB6E5,#86FDE8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .bottomMain {
    width: 100%;
    height: calc(100% - 64px);
    background: pink;
  }

.two {
  width: 500px;
  height: 100px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
  
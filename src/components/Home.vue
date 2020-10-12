<template>
  <div class="home-container">
    <div>
      
    </div>
    <el-menu
      class="el-menu-demo"
      :default-active="activeIndex"
      @select="handleSelect"
    >
      <!-- mode="horizontal" -->
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>
    <!-- <el-row class="topMenu">
      <el-col class="header" :span="24">
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
                <el-menu-item :index="item1.path" :key="index">{{item1.name}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
        
        <div class="information">
          等待秋天
        </div>
      </el-col>
    </el-row> -->

    <!-- <div class="bottomMain">
      <div>
        <router-view></router-view>
      </div>
    </div> -->
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
      time: false,
      endTime: 0
    }
  },
  mounted() {
    // window.addEventListener("scroll", this.$_throttle(this.$_scroll, 1000));
  },
  methods: {
    $_throttle(callback, delay) {
      let startTime = 0
      return function (event) {
        let endTime = Date.now()
        if (endTime - startTime > delay) {
          // console.log(this)
          // console.log(event)
          // callback.call(this, event)
          startTime = endTime
        }
      }
    },
    $_scroll() {
      console.log("$_scroll")
    },
    handleSelect(key, keyPath) {
      console.log("object")
      console.log(key, keyPath);
    },
  },
  // computed: {
  //   searchData_() {
  //     // return this.$store.state.arr
  //     console.log("object")
  //     console.log(this.$store.state.searchData)
  //     return this.$store.state.searchData;
  //   }
  // },
  // watch: {
  //   searchData_: {
  //     handler: function(newVal, oldVal) {
  //       console.log("handler")
  //       console.log(newVal)
  //       let arr = newVal.list
  //       this.total = newVal.total
  //       if (arr instanceof Array) {
  //         if (arr.length > 0) {
  //           arr.forEach(item => {
  //             item.xinzeng = []
  //             JSON.parse(item.ZLX).forEach(item1 => {
  //               let arr = []
  //               arr.push(item1.FIELD_NAME.toUpperCase())
  //               arr.push(item1.FIELD_CN_NAME)
  //               item.xinzeng.push(arr)
  //             })
  //             item.ORIGINAL_QUANTITY = 1
  //           })
  //           console.log("object")
  //           console.log(arr)
  //         }
  //       }
  //     }
  //   },
  //   deep: true,
  //   immediate: true
  // }
}
</script>

<style lang="less" scoped>
  .home-container {
    width: 100%;
    height: 100%;

    .el-meni-demo {

    }
  }
  .topMenu {
    width: 100%;
    height: 64px;
    .header {
      width: 100%;
      height: 100%;
      background-image: url('~@img/nav.png');
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
        // background: pink;
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
    // height: calc(100% - 64px);
    // height: 5000px;
    
    // background: pink;
  }
  .playMusic {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    background: pink;
    .img {
      height: 100%;
      flex: 0 0 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .singer_main {
      padding-left: 5px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
</style>
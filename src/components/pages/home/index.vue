<template>
  <div class="home-container">
    <sidebar  class="sidebar-container" />
    <div class="main-container">
      <top-nav></top-nav>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
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
  mounted() {},
  methods: {
    $_throttle(callback, delay) {
      let startTime = 0
      return function (event) {
        let endTime = Date.now()
        if (endTime - startTime > delay) {
          this.arr.length
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
    display: flex;
    .sidebar-container {
      width: 210px;
      height: 100%;
      background-color:rgb(48, 65, 86);
    }
    .main-container {
      width: calc(100% - 210px);
      height: 100%;
      // background: #f5f5d5;
    }
  }
</style>
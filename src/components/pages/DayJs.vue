<template>
  <div>
    <ul @click="lookTime">
      <li
        v-for="(item, index) in times"
        :key="index"
        class="todo"
      >
        {{item}}
      </li>
      <img src="@assets/logo.png" alt="">
      <div class="png"></div>
                
    </ul>
  </div>
</template>

<script>
const path = require('path')  //引入path模块

export default {
  name: "DayJs",
  props: {
    msg: String
  },
  data() {
    return {
      times: [],
    }
  },
  mounted() {
    this.times = [
      new Date(),
      this.$dayJs(),
      this.$dayJs().$d,
      this.$dayJs("2020-05-06"),
      this.$dayJs().format(),
      this.$dayJs().format(),
    ]
  },
  computed: {},
  methods: {
    lookTime() {
      console.log(this.$dayJs().format(), "当前北京时间")
      console.log(this.$dayJs().year(), "年")
      console.log(this.$dayJs().month(), "月")
      console.log(this.$dayJs().date(), "日")
      console.log(this.$dayJs().day(), "星期")
      console.log(this.$dayJs().hour(), "时")
      console.log(this.$dayJs().minute(), "分")
      console.log(this.$dayJs().second(), "秒")
      console.log(this.$dayJs().millisecond(), "毫秒")
      //Y代表年，M代办月，D代表天，d代表星期几0是星期天，H(24小时制)、h(12小时制)代表小时，m代表分钟，s代表秒，SSS代表毫秒
      console.log(this.$dayJs().format("YYYY-MM-DD HH:mm:s 周d"))
      console.log(this.$dayJs("2020-09-22 16:04:25").format("YYYY-MM-DD"))
      console.log(path.join(__dirname, "src/assets"))
    },
  },
}
</script>

<style lang='less' scoped>
  .todo {
    margin-bottom: 10px;
  }
  .png {
    width: 200px;
    height: 200px;
    background-image: url('~@/assets/logo.png');
    // background-image: url('../../assets/logo.png');
    background-size: 200px 200px;
  }
</style>
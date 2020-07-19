<template>
  <div class="home">
    <el-row class="topMenu">
      <el-col :span=24 >
        
      </el-col>
    </el-row>
    <el-row class="bottomMain">
      <el-col>
        main
      </el-col>
    </el-row>
    <!-- <day-js/> -->
  </div>
</template>

<script>
import DayJs from './pages/DayJs'
export default {
  name: 'Home',
  components: {
    DayJs
  },
  props: {},
  data() {
    return {
    }
  },
  mounted() {},
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
  }
  .topMenu {
    width: 100%;
    height: 64px;
    background: red;
  }
  .bottomMain {
    width: 100%;
    height: calc(100% - 64px);
    background: pink;
  }
</style>

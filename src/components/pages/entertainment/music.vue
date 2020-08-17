<template>
  <div class="music">
    <div class="musicContent">
      <div class="topBtn">
        <el-button>新增</el-button>
        <el-button>删除</el-button>
        <el-input v-model="search"></el-input>
        <el-button>查询</el-button>
        <el-button>排列方式</el-button>
        <el-select
          v-model="choose"
          @change="$_choose"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="main">
        <ul class="title">
          <li>歌手名</li>
          <li>歌曲名</li>
          <li>时长</li>
        </ul>
        <ul class="singer">
          <li>
            <img src="" alt="加载失败">
            <div></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'music',
  components: {},
  data() {
    return {
      isShowSinger: false, // 歌手
      search: "",
      choose: 1,
      options: [
        {label: "歌名", id: 1},
        {label: "歌手", id: 2},
        {label: "时间", id: 3},
      ],
    }
  },
  methods: {
    $_choose() {
      if (this.choose === 1) {
        this.isShowSinger = false
      }else if (this.choose === 2) {
        this.isShowSinger = true
      }else if (this.choose === 3) {
        this.isShowSinger = false
      }
    },
  },
}
</script>

<style lang='less' scoped>
.music {
  width: 100%;
  display: flex;
  justify-content: center;
  background: pink;
  .musicContent {
    width: 1200px;
    background: green;
    .main {
      width: 100%;
      height: 1000px;
      border: 1px solid #000000;
      .title {
        li {
          
        }
      }
    }
  }
}
</style>
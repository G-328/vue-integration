<template>
  <div class="music">
    <div class="musicContent">
      <div class="topBtn">
        <el-button>新增</el-button>
        <el-button>删除</el-button>
        <el-input v-model="search"></el-input>
        <el-button>查询</el-button>
        <el-button>排列方式</el-button>
        <span class="back" v-show="isShowSong">返回</span>
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
      <!-- <toto :data="data" @change1="change"></toto> -->
      <toto v-model="data"></toto>
      <div class="main">
        <!-- <ul class="title" v-show="isShowTitle">
          <li>歌手名</li>
          <li>歌曲名</li>
          <li>时长</li>
        </ul> -->
        <ul class="singer" v-show="isShowSinger">
          <template v-for="(item, index) in singerArr">
            <li :key="index" @click="$_singerClick(item)">
              <div class="img">
                <img :src="item.src" alt="加载失败">
              </div>
              <div class="singer_main">
                <p>{{item.name}}</p>
                <p>{{item.number}}</p>
              </div>
            </li>
          </template>
        </ul>
        <ul class="song" v-show="isShowSong">
          <li>
            <div class="img">
              <img src="@img/1.jpg" alt="加载失败">
            </div>
            <div class="song_main">
              <p>歌曲</p>
              <p>歌手</p>
            </div>
            <div class="operation">
              <span>播放</span>
              <span>编辑</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import toto from './music1'
export default {
  name: 'music',
  components: {
    toto
  },
  data() {
    return {
      data: 2,
      // isShowTitle: false,
      isShowSinger: true, // 歌手
      isShowSong: false, // 歌手
      search: "",
      choose: 1,
      options: [
        {label: "歌名", id: 1},
        {label: "歌手", id: 2},
        {label: "时间", id: 3},
      ],
      singerArr: [
        {
          src: require("@img/mla.png"),
          name: "邓紫棋",
          number: 6,
          id: 1
        },
        {
          src: require("@img/mla.png"),
          name: "张学友",
          number: 3,
          id: 2
        },
        {
          src: require("@img/mla.png"),
          name: "刀郎",
          number: 2,
          id: 3
        },
      ] 
    }
  },
  methods: {
    change(val) {
      this.data = val
    },
    $_choose() {
      if (this.choose === 1 || this.choose === 3) {
        // this.isShowTitle = true
        this.isShowSong = true
        this.isShowSinger = false
      }else if (this.choose === 2) {
        // this.isShowTitle = false
        this.isShowSong = false
        this.isShowSinger = true
      }
    },
    $_singerClick(data) {
      this.isShowSinger = false
      this.isShowSong = true

    },
  },
}
</script>

<style lang='less' scoped>
.music {
  width: 100%;
  display: flex;
  justify-content: center;
  background: url('~@img/3.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // background: pink;
  .musicContent {
    width: 1200px;
    background: green;
    .topBtn {
      position: relative;
      .back {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
    .main {
      width: 100%;
      height: 1000px;
      border: 1px solid #000000;
      .singer {
        li {
          width: 100%;
          height: 50px;
          display: flex;
          cursor: pointer;
          border-bottom: 1px solid red;
          // background: pink;
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
          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }
      }
      .song {
        li {
          display: flex;
          img {
            height: 50px;
            flex: 0 0 50px;
          }
          .song_main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .operation {
            flex: 0 0 80px;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div>
  homePage
  <!-- <p click="one">qweq</p> -->
  <el-button @click="one">qwew</el-button>
  <div class="qwer">
  <svg-icon icon-class="dabg"></svg-icon>

  </div>
  <el-button @click="two">two</el-button>
  <p>{{userName}}</p>
  <!-- <word v-if="two === 2"></word>
  <excel v-if="three === 2"></excel> -->
    <!-- <iframe width="1500px" height="600px" src="http://www.xdocin.com/xdoc?_func=to&amp;_format=html&amp;_cache=1&amp;_xdoc=http://47.92.6.236:9102/dcs.web/yozodoc.docx" frameborder="0"></iframe> -->
  <!-- <iframe id="iframe" width="1500px" height="900px" :src="src" frameborder="0" ref="ifr"></iframe> -->
    <!-- <div class="one">
      <svg-icon icon-class="dengPao"></svg-icon>
    </div> -->
    <!-- <div id="wps" style="width:100%;height:100%"></div> -->
  </div>
</template>

<script>
import word from './word.vue';
import excel from './excel.vue';
import { mapState } from 'vuex'
export default {
  name: 'HomePage',
  components: {
    word,
    excel
  },
  data() {
    return {
      // two: 1,
      three: 1,
    }
  },
  mounted() {
    // window.addEventListener("message", this.getChildMsg, false)
    // this.initWps()
  },
  methods: {
    getChildMsg(event) {
      console.log("qwew", event)
      console.log('父页面获取到信息是：' + event.data);
      this.$router.push("/home/statistical")
    },
    two() {
      this.three++;
    },

    one() {
      // this.two++;
      this.$store.state.one = "zxc"
      return
      // let iframe = document.getElementById('iframe').contentWindow;
      // iframe.postMessage(JSON.stringify({userName: "qwe"}), '*');   // 第二个参数可是具体域名或*（传递给所有的窗口）
      // iframe.postMessage('父级点击了xx，传给子页面xx', '*');   // 第二个参数可是具体域名或*（传递给所有的窗口）
      let b = window.open("http://192.168.168.185:8050/#/login")
      console.log(b, "bbbb")
      b.postMessage(JSON.stringify("Hello", "http://192.168.168.185:8050/#/login"))
      // b.postMessage(JSON.stringify({userName: "qwe"}, "http://192.168.168.185:8050/#/login"))
    },
    initWps() {
      // console.log("-=-=-=init-=-=-=-=")
      let plugin = this.setAttr();
      console.log("qwe", plugin)
      this.$nextTick(() =>{
        let obj = document.getElementById("wps")
        // console.log(obj, "qwewqw")
        obj.appendChild(plugin)
        plugin.createDocument("wps")
        // if (this.detectOS() === "Win") {
          console.log("qwewqw")
          // plugin.application.openDocumentRemote(this.originSrc, false)
          // plugin.application.openDocument(originSrc, false)
          // plugin.application.openDocument("C:\\Users\\gjy\\Desktop\\数字档案管理系统配置说明文档 - 副本.docx", false)
        plugin.application.openDocument("C:\\Users\\gjy\\Desktop\\石家庄 - 副本.wps", false)

        // }else if (this.detectOS() === "Linux") {
          // let originSrc = this.orisginSrc.replace(sessionStorage.getItem("originalIP"), "")
          // plugin.application.openDocumentRemote(originSrc, false)
          // plugin.application.openDocument(originSrc, false)
        // }
      })
      
      // plugin.application.openDocument("C:/Users/gjy/Desktop/新建文本文档.txt", false)
    },
    setAttr() {
      let plugin = document.createElement("embed")
      plugin.setAttribute("type", "application/x-wps-np-plugin")
      plugin.setAttribute("width", "100%")
      plugin.setAttribute("height", "100%")
      plugin.setAttribute("id", "WpsDocFrame")
      return plugin
    },
  },
  computed: {
    ...mapState({
      userName: state => state.user.userName
    }),
    // userName() {
    //   return this.$store.state.user.userName
    // },
    src () {
      // this.$store
      // return "file:///C:/Users/gjy/Desktop/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9/dist/index.html#/login"
      // return `http://172.15.25.4:8050/#/main?userName=${encodeURIComponent("高金雍")}`
      return `http://192.168.168.187:8050/#/login`
      // return `http://172.15.25.4:8050/#/main?userName=王磊?token=abc=qwe`
      return encodeURIComponent('http://172.15.25.4:8050/#/main?userName=高金雍')
    }
  },
  watch: {

  }
}
</script>

<style lang='less' scoped>
.one {
  color: pink;
}
.qwer {
  width: 100px;
  height: 100px;
  color: blue;
  background: pink;
  &:hover {
    color: #fff;
    background: yellow;
  }
}
</style>
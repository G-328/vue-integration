<template>
  <div>
    <div class="btn"><button @click="one">获取原生样式属性</button></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'dragLX',
  components: {},
  data() {
    return {
      
    }
  },
  methods: {
    one() {
      const btn = document.querySelector(".btn")
      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = btn.currentStyle || window.getComputedStyle(btn, null);
      // console.log("one")
      // console.log(sty)
      btn.onmousedown = (e) => {
        console.log("onmousedown")
        console.log(e)
        const disX = e.clientX - btn.offsetLeft;
        const disY = e.clientY - btn.offsetTop;
        console.log(disX)
        console.log(disY)
      }
    },
  },
}
</script>

<style lang='less' scoped>

</style>
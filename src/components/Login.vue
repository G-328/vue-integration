<template>
  <div class="wrap">
    <canvas id="one" width="" height=""></canvas>
    <img src="../assets/img/back.png" class="img">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Login',
  data() {
    return {}
  },
  methods: {},
  mounted() {
    let can = document.getElementById("one")
    let wrap = document.getElementsByClassName("wrap");
    let img = document.querySelector(".img")
    let ctx = can.getContext("2d");
    // console.log("jsdkj",wrap,wrap[0].clientWidth,wrap[0].offsetWidth);
    // can.style.width = wrap[0].clientWidth+"px";
    // image.onloand
    // can.style.width = img.clientWidth+"px";
    // can.style.height = img.clientHeight+"px";
    ctx.drawImage(img,0,0);
  },
}
</script>

<style lang='less' scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: pink;
}
.img {
  width: 150px;
  height: 150px;
}
</style>
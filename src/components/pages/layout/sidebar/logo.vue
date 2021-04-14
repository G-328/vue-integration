<template>
  <div class="logo" :class="{'logo-shrink': !collapse}">
    <img :src="logoUrl" alt="裂开" class="logo-img">
    <h1 v-if="collapse" class="logo-title">欲上琼楼</h1>
  </div>
</template>

<script>
export default {
  name: 'logo',
  props: {
    collapse: {
      type: Boolean,
      require: true
    }
  },
  data() {
     return {
       logoUrl: require("@img/logo.png")
     }
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.logo {
  width: 100%;
  height: 50px;
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .logo-img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }
}

.logo-shrink {
  .logo-img {
    margin-right: 0;
  }
}
</style>

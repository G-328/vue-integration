<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>

<style lang="less">
// @import "@assets/less/common.less";
@import "@assets/less/public.less";
  #app {
    width: 100%;
    height: 100%;
  }
</style>

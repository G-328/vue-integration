<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    Home
  },
  methods: {},
}
</script>

<style lang="less">
@import "@assets/less/common.less";
@import "@assets/less/public.less";
  #app {
    width: 100%;
    height: 100%;
  }
</style>

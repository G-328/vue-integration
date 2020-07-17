<template>
  <div class="home">
    <nav></nav>
    <button @click="qwe">跳转</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    qwe() {
      this.$router.push('/RichTextEditor')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

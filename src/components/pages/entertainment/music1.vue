<template>
  <div>
    <p>{{value}}</p>
    <button @click="changeData">试试</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  components: {},
  props: ["value"],
  methods: {
    changeData() {
      this.$emit('input', 3)
    },
  },
}
</script>

<style lang='less' scoped>

</style>
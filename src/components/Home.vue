<template>
  <div class="home">
    <day-js/>
  </div>
</template>

<script>
import DayJs from './pages/DayJs'
export default {
  name: 'Home',
  components: {
    DayJs
  },
  props: {
    // msg: String
  },
  data() {
    return {
    }
  },
  mounted() {},
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

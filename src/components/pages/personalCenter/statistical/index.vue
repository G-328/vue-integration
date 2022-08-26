<template>
    <div>
        statistical
        {{pageSize}} --- {{pageNum}}
        <indexTwo
          :total="total"
          @handleSizeOrNum="handleSizeOrNum"
        ></indexTwo>
        <button @click="one">改变total</button>
          <!-- @handleCurrentChange="handleCurrentChange" -->
          <!-- :pageSize="pageSize" -->
          <!-- :pageNum="pageNum" -->
    </div>
</template>

<script>
import indexTwo from './indexTwo.vue'
export default {
    name: "Statistical",
    components: {
      indexTwo
    },
    data() {
        return {
          pageSize: 20,
          pageNum: 1,
          total: 60
        };
    },
    methods: {
      one() {
        if (this.pageNum === 1) return
        let deleteDataLength = 10
        if (deleteDataLength = (this.total - (this.pageSize * (this.pageNum - 1)))) {
          this.pageNum = this.pageNum - 1
        }
        this.total = 40
      },
      handleSizeOrNum(val, type) {
        if (type === "pageSize") {
          this.pageSize = val
        }else {
          this.pageNum = val
        }
      }
    },
};
</script>

<style lang="less" scoped></style>

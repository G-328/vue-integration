<template>
  <!-- 分页器组件 -->
  <div class="pagination_bar">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizeArr"
      :page-size="pageSize"
      background
      layout="prev,pager,next,total,jumper,sizes"
      prev-text='上一页'
      next-text='下一页'
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: { total: { type: Number } },
  data() {
    return {
      // total: 4000,
      currentPage: 1,
      pageSizeArr: [20, 40, 60],
      pageSize: 20
    };
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>

<style lang="less">
.pagination_bar {
  width: 100%;
  background: white;
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: @themeColor;
    color: #fff;
  }
  .el-pagination {
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    -moz-box-sizing: border-box; /* Firefox */
    -webkit-box-sizing: border-box; /* Safari */
    text-align: center;
    span {
    }
    button {
      width: 36px;
      height: 36px;
      i {
        font-size: 18px !important;
      }
    }
  }
  .el-pager li {
    min-width: 36px !important;
    height: 36px;
    line-height: 36px;
  }
  .el-pagination span:not([class*="suffix"]) {
    height: 36px;
    line-height: 36px;
  }
  .el-input__inner {
    height: 28px;
    border-color: @themeColor;
  }
}
</style>
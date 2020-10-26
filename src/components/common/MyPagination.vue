<template>
  <div class="my-pagination" :class="{'is-opened': !sidebar.opened}">
    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyPagination',
  props: {
    // 总条数
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50, 100],
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.sidebar
    })
  },
  methods: {
    handleSizeChange(pageSize) {
      // 当前页面数据条数
      this.$emit("handleSizeChange", pageSize)
    },
    handleCurrentChange(currentPage) {
      // 当前页数
      this.$emit("handleCurrentChange", currentPage)
    }
  },
}
</script>

<style lang='less' scoped>
@import "@/assets/less/common.less";

  .my-pagination {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: pink;
    .el-pagination {
      padding: 0;
    }
  }
</style>

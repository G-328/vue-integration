<template>
  <div>
    <div class="btn-up">
      <el-button type="primary">新增</el-button>
      <el-button type="primary">删除</el-button>
    </div>
    <div class="table-container">
      <MyTable
        :titleData="titleData"
        :tableData="tableData"
        :operationData="operationData"
        @handleButton="handleButton"
        @selectionChange="selectionChange"
        @selectAll="selectAll"
      >
      </MyTable>
      <MyPagination
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
      </MyPagination>
    </div>
    
  </div>
</template>

<script>
import MyTable from '@/components/common/MyTable'
import MyPagination from '@/components/common/MyPagination'
import { gameData} from '@/utils/js/data'
export default {
  components: {
    MyTable,
    MyPagination
  },
  data() {
    return {
      total: 100,
      titleData: [
        {
          prop: "name",
          label: "游戏名"
        },
        {
          prop: "year",
          label: "出产年份"
        },
        {
          prop: "pattern",
          label: "销售模式"
        },
        {
          prop: "type",
          label: "游戏类型"
        },
        {
          prop: "manufacturer",
          label: "游戏厂商"
        },
      ],
      operationData: {
        label: "操作",
        width: "100",
        options: [
          {
            label: "编辑",
            type: "add"
          },
          {
            label: "删除",
            type: "delete"
          },
        ]
      }
    }
  },
  computed: {
    tableData() {
      return gameData
    }
  },
  methods: {
    handleButton(data) {
      console.log("selectionChange", data)
    },
    selectionChange() {
      // console.log("selectionChange", arguments)
    },
    selectAll(data) {
      console.log("selectAll", data)
    },
    handleSizeChange(pageSize) {
      console.log("handleSizeChage", pageSize)
    },
    handleCurrentChange(currentPage) {
      console.log("handleCurrentChange", currentPage)
    },
  },
}
</script>

<style lang='less' scoped>

</style>

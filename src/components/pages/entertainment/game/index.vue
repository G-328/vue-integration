<template>
  <div>
  game
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
</template>

<script>
import MyTable from '@/components/common/MyTable'
import MyPagination from '@/components/common/MyPagination'
export default {
  // name: 'Game',
  components: {
    MyTable,
    MyPagination
  },
  data() {
    return {
      total: 100,
      titleData: [
        {
          prop: "sss",
          label: "我的"
        },
        {
          prop: "www",
          label: "他的"
        },
      ],
      tableData: [
        {
          sss: "嘿嘿",
          www: "哈哈"
        },
        {
          sss: "哈喽",
          www: "hello"
        },
      ],
      operationData: {
        label: "操作",
        width: "100",
        options: [
          {
            label: "新增",
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

<template>
  <div class="my-table">
    <el-table
      :data="tableData"
      :border="showBorder"
      style="width: 100%"
      :empty-text="emptyText"
      highlight-current-row
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
    >

      <el-table-column
        v-if="showIndex"
        label="序号"
        type="index"
        width="50"
        align="center"
      >
      </el-table-column>

      <el-table-column
        v-if="showSelection"
        type="selection"
        width="55"
        align="center"
      >
      </el-table-column>

      <el-table-column
        v-if="showOperation"
        :label="operationData.label"
        :width="operationData.width"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in operationData.options"
            :key="index"
            :size="buttonSize"
            @click="handleButton(item.type, scope.row, scope.$index)"
          >{{item.label}}</el-button>
        </template>
      </el-table-column>

      <template v-for="(item, index) in titleData">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="showOverflow"
        >
        </el-table-column>
      </template>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "MyTable",
  props: {
    // 表头数据
    titleData: {
      type: Array,
      default: () => {
        return []
      },
    },

    // 表格数据
    tableData: {
      type: Array,
      default: () => {
        return []
      },
    },

    // 操作栏数据
    operationData: {
      type: Object,
      default: () => {
        return {}
      },
    },

    // 操作按钮大小
    buttonSize: {
      type: String,
      default: "mini"
    },

    // 空数据时，显示的文本内容
    emptyText: {
      emptyText: String,
    },

    // 当内容过长被隐藏时显示
    showOverflow: {
      type: Boolean,
      default: true
    },

    // 是否带有纵向边框
    showBorder: {
      type: Boolean,
      default: true
    },

    // 是否显示序号
    showIndex: {
      type: Boolean,
      default: true
    },
    
    // 是否显示复选框
    showSelection: {
      type: Boolean,
      default: true
    },

    // 是否显示操作栏
    showOperation: {
      type: Boolean,
      default: true
    },

  },
  data() {
    return {
      
    }
  },
  methods: {
    selectionChange(selection) {
      // selection：选中数据的数组
      this.$emit("selectionChange", selection)
    },
    select(selection, row) {
      // selection: 选中数据的数组
      // row：刚点击过的数据对象
      this.$emit("select", selection, row)
    },
    selectAll(selection) {
      // selection: 选中数据的数组
      this.$emit("selectAll", selection)
    },
    handleButton(type, row, index) {
      this.$emit("handleButton", {type, row, index})
    },
  },
}
</script>

<style lang='less' scoped>

</style>

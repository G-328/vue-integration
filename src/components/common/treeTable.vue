<template>
  <div id="my_table">
    <el-table
              :data="tableData"
              height="calc(100vh - 250px)"
              style="width:100%"
              row-key="id"
              border
              :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
              @selection-change="selectionTable"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column
                v-for="(item,index) in threeInOneDataLabel"
                :key="index"
                :label="item.label"
                :prop="item.param"
              ></el-table-column>
              <el-table-column
                v-if="threeInOneDataOption.label"
                :width="threeInOneDataOption.width"
                :label="threeInOneDataOption.label"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    @click.stop="handleButton(item.methods, scope.row, scope.$index)"
                    type="text"
                    size="small"
                    v-for="(item, index) in threeInOneDataOption.options"
                    :key="index"
                  >{{ item.label }}</el-button>
                </template>
              </el-table-column>
            </el-table>
  </div>
</template>

<script>
export default {
  /**
   * @name 表格封装
   * @export Table
   * @param operateData [Boolean] 操作栏数据
   * @param expandShow [Boolean] 控制是否开启展开查看详情
   * @param tableData [Array] 数据
   * @param titleData [Array] 表头数据
   * @param height [Array] 配置表格高度
   * @param border [Boolean] 配置边框
   * @param showBorder [Array] 是否显示边框
   * @param showSelection [Boolean] 是否显示多选
   * @param showOperate [Boolean] 是否显示操作栏
   */
  props: {
    titleData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: {
      type: String
      // default: () => {
      //   return "calc(100vh - 270px)";
      // }
    },
    showHeader: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    showBorder: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    showSelection: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    showOperate: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    //是否展示文字类型查看
    showText: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    operateData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    IndexShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      emptyText: "暂无数据",
      tableDataSelected: []
    };
  },
  methods: {
    
    handleButton(methods, row, index) {
      // 按钮事件
      this.$emit("handleButton", { methods, row });
    },
    changeRowClassName({ row, rowIndex }) {
      this.$emit("changeRowClassName", { row, rowIndex });
    },
    rowClick(row, column, event) {
      // 按钮事件
      this.$emit("rowClick", row, column, event);
    },
    selectionChange(row) {
      this.$emit("selectionChange", row);
    }
  }
};
</script>

<style lang="less" scoped>
#my_table {
  .mar {
    margin-right: 10px;
  }
}
</style>

<template>
 <!-- style="margin-top:10px" -->
  <div id="my_table">
    <el-table
      class="tableName"
      :data="tableData"
      style="width:100%"
      ref="multipleTable"
      highlight-current-row
      :empty-text="emptyText"
      :border="showBorder"
      :show-header="showHeader"
      :height="height"
      :header-cell-style="{ background: 'rgba(250,250,250,1)', color: '#333333' }"
      :row-class-name="changeRowClassName"
      @row-click="rowClick"
      @selection-change="selectionChange"
    >
      <el-table-column
        type="selection"
        :show-overflow-tooltip="true"
        v-if="showSelection"
        align="center"
      ></el-table-column>

      <el-table-column
        label="序号"
        width="60"
        type="index"
        v-if="IndexShow"
        :index="indexMethod"
        align="center"
      ></el-table-column>

      <!-- <el-table-column type="index" v-if="showSorting" :label="one.label" :index="indexMethod" align="center"></el-table-column> -->

      <el-table-column
        :width="operateData.width"
        :label="operateData.label"
        align="center"
        v-if="showOperate"
        border
      >
        <template slot-scope="scope">
          <div v-if="!showText">
            <el-tooltip
              v-for="(item, index) in operateData.options"
              :key="index"
              effect="dark"
              :content="item.label"
              placement="bottom"
            >
              <i
                @click.stop="
                  handleButton(item.methods, scope.row, scope.$index)
                "
                id="curser"
                :class="item.icon"
                aria-hidden="true"
                style="margin-right:10px"
              ></i>
            </el-tooltip>
          </div>
          <div v-if="showText">
            <!-- <template v-for="(item, index) in operateData.options">
              <el-button
                @click.stop="handleButton(item.methods, scope.row, scope.$index)"
                type="text"
                size="small"
                :key="index"
              >{{ item.label }}</el-button>
            </template> -->
            <el-button
              @click.stop="handleButton(item.methods, scope.row, scope.$index)"
              type="text"
              size="small"
              v-for="(item, index) in operateData.options"
              :key="index"
            >{{ item.label }}</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        v-for="(item, index) in titleData"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="item.render">{{item.render(scope.row)}}</span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <!--
          @name 操作
          @param operateData 父组件传值
          @param label [string] 名称
          @param width [string] 宽度
          @param options [array] 按钮数组
          @param type 按钮类型
          @param icon 按钮图标
          @param handleButton 按钮方法
      -->
      <!-- <el-table-column
        :width="operateData.width"
        :label="operateData.label"
        align="center"
        v-if="showOperate"
        border
      >
        <template slot-scope="scope">
          <div v-if="!showText">
            <el-tooltip
              v-for="(item, index) in operateData.options"
              :key="index"
              effect="dark"
              :content="item.label"
              placement="bottom"
            >
              <i
                @click.stop="
                  handleButton(item.methods, scope.row, scope.$index)
                "
                id="curser"
                :class="item.icon"
                aria-hidden="true"
                style="margin-right:10px"
              ></i>
            </el-tooltip>
          </div>
          <div v-if="showText">
            <el-button
              @click.stop="handleButton(item.methods, scope.row, scope.$index)"
              type="text"
              size="small"
              v-for="(item, index) in operateData.options"
              :key="index"
              >{{ item.label }}</el-button
            >
          </div>
        </template>
      </el-table-column>-->
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
    // operateData: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   }
    // },
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
    //是否展示排序
    // showSorting: {
    //   type: Boolean,
    //   default: () => {
    //     return false;
    //   }
    // },
    // one: {
    //   type: Object,
    //   default: () => {
    //     return {};
    //   }
    // },
  },
  data() {
    return {
      emptyText: " ",
      tableDataSelected: []
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
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

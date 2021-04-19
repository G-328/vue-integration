<template>
  <el-table
    ref="table"
    :data="tableData"
    v-loading="loading"
    element-loading-text="Loading"
    border
    :height="height"
    :empty-text="emptyText"
    fit
    highlight-current-row
    tooltip-effect="dark"
    :header-cell-style="{ background: '#f4f7fa' }"
    style="width:100%"
    @row-click="rowClick"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
  >
    <el-table-column  v-if="selectionShow" type="selection" width="55" align="center"></el-table-column>

    <el-table-column label="序号" width="60" type="index" v-if="IndexShow" :index="indexMethod" align="center"></el-table-column>
    <el-table-column
      v-if="tableOption.label"
      :width="tableOption.width"
      :label="tableOption.label"
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          @click.stop="handleButton(item.methods, scope.row, scope.$index)"
          type="text"
          size="small"
          v-for="(item, index) in tableOption.options"
          :key="index"
        >{{ item.label }}</el-button>
      </template>
    </el-table-column>
    <el-table-column type="expand" v-if="expandShow">
      <template slot-scope="scope">
        <el-form class="table-expand">
          <el-form-item v-for="(item,index) in tableLabel" :key="index" :label="item.label">
            <span v-if="item.render">{{item.render(scope.row)}}</span>
            <span v-else>{{scope.row[item.param]}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      v-for="(item,index) in tableLabel"
      :key="index"
      :width="item.width ? item.width : ''"
      align="center"
      :label="item.label"
      :prop="item.param"
      :sortable="item.sortable ? 'custom' : false"
    >
      <template slot-scope="scope">
        <span v-if="item.render">{{item.render(scope.row)}}</span>
        <span v-else>{{scope.row[item.param]}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/**
 * @name 表格封装
 * @export TableElement
 * @param loading [Boolean] 配置加载提示
 * @param expandShow [Boolean] 控制是否开启展开查看详情
 * @param selectionShow [Boolean] 控制是否开启复选框
 * @param IndexShow [Boolean] 控制是否开启序号
 * @param tableData [Array] 数据
 * @param tableMain [Array] 数据详情
 * @param height [Array] 配置表格高度
 * @param tableLabel [Array] 配置表格头部
 * @param tableOption [Object] 操作按钮
 * @param border [Boolean] 配置边框
 */
export default {
  data() {
    return {
      emptyText: " ",
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    expandShow: {
      type: Boolean,
      default: false
    },
    selectionShow: {
      type: Boolean,
      default: false
    },
    IndexShow: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableMain: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableLabel: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: {
      type: String,
      default: () => {
        return "calc(100vh - 270px)";
      }
    },
    tableOption: {
      type: Object,
      default: () => {
        return {};
      }
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    // methods:按钮名称 row：同一行的数据 index：第几行（0开始）
    handleButton(methods, row, index) {
      // 按钮事件
      // console.log(row);
       this.$emit("handleButton", { methods: methods, row: row },{index:index});
    },
    handleSortChange(val) {
      // 排序
      this.$emit("handleSortChange", val);
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    rowClick(val) {
      this.$emit("rowClick", val);
    }
  }
};
</script>

<style  scoped>
.el-button {
  padding: 3px;
  margin-left: 0px !important;
}
.table-expand {
  font-size: 0;
  display: flex;
  flex-wrap: wrap;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.button_ {
  float: left;
  width: 80px;
}
#curser {
  cursor: pointer;
  margin-left: 6px;
}
</style>
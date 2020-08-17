<template>
  <div id="my_transfrom">
    <div style="text-align: center">
      <el-transfer
        style="text-align: left; display: inline-block"
        v-model="value"
        filterable
        :titles="title"
        :button-texts="['左移','右移']"
        @right-check-change="handleChange"
        :data="data"
        :props="{
           key: 'e',
           label: 'z'
        }"
        target-order
      ></el-transfer>
      <div class="el-transfer__buttons" style="overflow:hiddle">
        <button
          type="button"
          class="el-button el-button--primary el-button--small el-transfer__button"
          @click="moveUp"
        >
          <span>
            <i class="el-icon-arrow-up"></i>上移
          </span>
        </button>
        <button
          type="button"
          class="el-button el-button--primary el-button--small el-transfer__button"
          @click="moveDown"
        >
          <span>
            下移
            <i class="el-icon-arrow-down"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "datas"],
  data() {
    return {
      data: [],
      value: [],
      selectedArr: []
    };
  },
  mounted() {
    this.data = [...this.datas];
  },
  methods: {
    handleChange(val1, val2) {
      this.selectedArr = val1;
    },
    moveUp() {
      if (this.selectedArr.length > 1) {
        this.$message({
          closeOnClickModal: false,
          closeOnPressEscape: false,
          title: "消息",
          message: "请选择一个字段",
          type: "error"
        });
        return false;
      }

      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i] == this.selectedArr[0]) {
          if (i == 0) {
            this.$message({
              closeOnClickModal: false,
              closeOnPressEscape: false,
              title: "消息",
              message: "已经是第一个了",
              type: "error"
            });
          } else {
            let upDate = this.value[i - 1];
            this.value.splice(i - 1, 1);
            this.value.splice(i, 0, upDate);
            // console.log(this.value);
            break;
          }
        }
      }
    },
    moveDown() {
      if (this.selectedArr.length > 1) {
        this.$message({
          closeOnClickModal: false,
          closeOnPressEscape: false,
          title: "消息",
          message: "请选择一个字段",
          type: "error"
        });
        return false;
      }
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i] == this.selectedArr[0]) {
          if (i == this.value.length - 1) {
            this.$message({
              closeOnClickModal: false,
              closeOnPressEscape: false,
              title: "消息",
              message: "已经是最后一个了",
              type: "error"
            });
          } else {
            let downDate = this.value[i + 1];
            this.value.splice(i + 1, 1);
            this.value.splice(i, 0, downDate);
            // console.log(this.value);
            break;
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
#my_transfrom {
  .el-button--primary,
  .el-button--primary.is-disabled,
  .el-button--primary.is-disabled:active,
  .el-button--primary.is-disabled:focus,
  .el-button--primary.is-disabled:hover {
    color: #fff;
    background-color: #bf2a34;
    // border-color: #bf2a34;
  }
  .transfer__button.is-disabled:hover {
    border: 1px solid #dcdfe6;
    background-color: #f5f7fa;
    color: #c0c4cc;
  }
  .el-transfer-panel {
    width: 250px;
  }
}
.el-button [class*="el-icon-"] + span {
  margin-left: 0;
}
.el-transfer__button i, .el-transfer__button span {
}
</style>

<template>
  <div id="transform">
    <el-row>
      <el-col :span="spans[0]">
        <el-table
          :data="dataLeft"
          border
          :header-cell-style="{ background: '#f4f4f4' }"
          :height="height"
          @selection-change="seletionLeft"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            v-for="(item, index) in leftTitleData"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
          ></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4" style="margin-top:100px">
        <div style="margin-bottom:20px">
          <el-button
            type="warning"
            icon="el-icon-arrow-left"
            circle
            :disabled="disableFlagLeft"
            @click="moveLeft"
          ></el-button>
        </div>
        <div style>
          <el-button
            type="warning"
            icon="el-icon-arrow-right"
            circle
            :disabled="disableFlagRight"
            @click="moveRight"
          ></el-button>
        </div>
      </el-col>
      <el-col :span="spans[1]">
        <el-table
          :data="dataRight"
          border
          :header-cell-style="{ background: '#f4f4f4' }"
          :height="height"
          @selection-change="seletionRight"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            v-for="(item, index) in rightTitleData"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="this.title[2]"
            :label="title[2]"
            show-overflow-tooltip
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.orderBy" v-if="scope.row.orderBy">
                <el-radio label="ASC">升序</el-radio>
                <el-radio label="DESC">降序</el-radio>
              </el-radio-group>
              <el-radio-group v-model="scope.row.orderType" v-if="scope.row.orderType">
                <el-radio label="ASC">升序</el-radio>
                <el-radio label="DESC">降序</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4" style="margin-top:100px;textAlign:center">
        <div style="margin-bottom:20px" v-if="showRight">
          <el-button
            type="warning"
            icon="el-icon-arrow-up"
            circle
            :disabled="disableFlagUp"
            @click="moveUp"
          ></el-button>
        </div>
        <div style="margin-bottom:20px" v-if="showRight">
          <el-button
            type="warning"
            icon="el-icon-arrow-down"
            circle
            :disabled="disableFlagDown"
            @click="moveDown"
          ></el-button>
        </div>
        <div v-if="showSaveBtn">
          <el-button class="defaultBtn" @click="handleSave">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    datasLeft: {
      type: Array
      // default: () => {
      //   return [];
      // }
    },
    datasRight: {
      type: Array
      // default: () => {
      //   return [];
      // }
    },
    title: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: {
      type: Number,
      default: () => {
        return 500;
      }
    },
    spans: {
      type: Array,
      default: () => {
        return [8, 8];
      }
    },
    leftTitleData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rightTitleData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    props: {
      type: String,
      default: () => {
        return "";
      }
    },
    showRight: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    showSaveBtn: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
      // dataLeft: [],
      // dataRight: [],
      arrLeft: [],
      arrRight: [],
      disableFlagLeft: true,
      disableFlagRight: true,
      disableFlagUp: true,
      disableFlagDown: true
    };
  },
  mounted() {
    // this.dataLeft = [...this.datasLeft];
    // this.dataRight = [...this.datasRight];
  },
  computed: {
    dataLeft: function() {
      return this.datasLeft;
    },
    dataRight: function() {
      return this.datasRight;
    }
  },

  methods: {
    seletionLeft(val) {
      if (val) {
        this.arrLeft = val;
      }
      if (this.arrLeft.length > 0) {
        this.disableFlagRight = false;
      } else {
        this.disableFlagRight = true;
      }
    },
    seletionRight(val) {
      if (val) {
        this.arrRight = val;
      }

      if (this.arrRight.length > 0) {
        this.disableFlagLeft = false;
        this.disableFlagUp = false;
        this.disableFlagDown = false;
      } else {
        this.disableFlagLeft = true;
        this.disableFlagUp = true;
        this.disableFlagDown = true;
      }
      // if (this.arrRight.length > 0) {
      //   this.arrRight.forEach((v, i) => {
      //     if (this.dataRight.indexOf(v) == 0) {
      //       this.disableFlagDown = false;
      //       this.disableFlagUp = true;
      //     } else if (
      //       this.dataRight.indexOf(v) ==
      //       this.dataRight.length - 1
      //     ) {
      //       this.disableFlagUp = false;
      //       this.disableFlagDown = true;
      //     } else {
      //       this.disableFlagDown = false;
      //       this.disableFlagUp = false;
      //     }
      //   });
      // }
    },
    moveRight() {
      this.arrLeft.forEach(i => {
        this.dataLeft = this.dataLeft.filter(item => {
          return item != i;
        });
        this.dataRight.push(i);
      });
     
    },
    moveLeft() {
      this.arrRight.forEach(i => {
        this.dataRight = this.dataRight.filter(item => {
          return item != i;
        });
        this.dataLeft.unshift(i);
      });
    },
    moveUp() {
      if (this.arrRight.length > 1) {
        this.$message({
          closeOnClickModal: false,
          closeOnPressEscape: false,
          title: "消息",
          message: "请选择一个字段",
          type: "error"
        });
        return false;
      }

      for (var i = 0; i < this.dataRight.length; i++) {
        if (this.dataRight[i] == this.arrRight[0]) {
          if (i == 0) {
            this.$message({
              closeOnClickModal: false,
              closeOnPressEscape: false,
              title: "消息",
              message: "已经是第一个了",
              type: "error"
            });
          } else {
            let upDate = this.dataRight[i - 1];
            //console.log(upDate);
            this.dataRight.splice(i - 1, 1);
            this.dataRight.splice(i, 0, upDate);
            break;
          }
        }
      }
    },
    moveDown() {
      if (this.arrRight.length > 1) {
        this.$message({
          closeOnClickModal: false,
          closeOnPressEscape: false,
          title: "消息",
          message: "请选择一个字段",
          type: "error"
        });
        return false;
      }
      for (var i = 0; i < this.dataRight.length; i++) {
        if (this.dataRight[i] == this.arrRight[0]) {
          if (i == this.dataRight.length - 1) {
            this.$message({
              closeOnClickModal: false,
              closeOnPressEscape: false,
              title: "消息",
              message: "已经是最后一个了",
              type: "error"
            });
          } else {
            let downDate = this.dataRight[i + 1];
            this.dataRight.splice(i + 1, 1);
            this.dataRight.splice(i, 0, downDate);
            break;
          }
        }
      }
    },
    handleSave() {
      this.$emit("handleClick", this.dataRight);
    }
  }
};
</script>

<style lang="less" scoped>
#transform {
  width: 100%;
  margin: auto;
}
#transform .is-circle {
  display: block;
  margin: auto;
}
</style>

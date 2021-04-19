<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="formCondition" label-position="right">
        <el-col :span="23">
          <el-form-item label="权限编辑:" required>
            <el-col :span="5">
              <el-select v-model="formCondition.field" @change="changefn" value-key="fieldCnName">
                <el-option
                  v-for="(item, index) in options_"
                  :key="index"
                  :label="item.fieldCnName"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-select v-model="formCondition.symbol" value-key="label">
                <el-option
                  v-for="(item, index) in operationOption"
                  :key="index"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-input v-model="formCondition.fieldValue" v-if="selectTrue == false" placeholder></el-input>
              <el-select
                v-if="selectTrue == true"
                v-model="formCondition.fieldValue"
                value-key="dicName"
              >
                <el-option
                  v-for="(item, index) in DicOptions"
                  :key="index"
                  :label="item.dicName"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-select v-model="formCondition.way" value-key="value" placeholder="请选择">
                <el-option
                  v-for="(item,index) in fnOptions"
                  :key="index"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <el-button style="margin-left:5px" @click="addCondition">新增</el-button>
            </el-col>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :span="20" :offset="2">
        <el-table :data="tableCondition" style="width:100%;" height="200">
          <el-table-column prop="condition" align="center" label="已选条件"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableCondition)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getlist, getAllValue } from "@/api/fileCollect";
export default {
  props: ["fieldData", "des", "cedata", "expressiondata"],
  data() {
    return {
      options_: [],
      selectTrue: false,
      titleCondition: [
        { label: "已选条件", prop: "condition", align: "center" }
      ],
      tableCondition: [],
      formCondition: {
        field: "",
        symbol: "",
        fieldValue: "",
        way: ""
      },
      operationOption: [
        { label: "等于", value: "=" },
        { label: "不等于", value: "!=" },
        { label: "大于", value: ">" },
        { label: "大于等于", value: ">=" },
        { label: "小于", value: "<" },
        { label: "小于等于", value: "<=" },
        { label: "包含", value: "like" },
        { label: "不包含", value: "not like" }
      ],
      fnOptions: [
        { label: "或", value: "or" },
        { label: "且", value: "and" }
      ]
    };
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
      // console.log(this.tableCondition);
    },
    changefn(val) {
      // console.log(val);
      this.options_.forEach(item => {
        if (item.fieldName == val.fieldName) {
          if (item.inputClass_text == "下拉框") {
            this.selectTrue = false;
            getAllValue({
              id: item.referenceId,
              refType: item.referenceType,
              selectType: item.selectType
            }).then(res => {
              this.DicOptions = res.data;
            });
          } else {
            this.selectTrue = false;
          }
        }
      });
    },
    addCondition() {
      if (!this.formCondition.field.fieldCnName) {
        this.$message({
          title: "消息",
          message: "请把筛选条件填写完整",
          type: "warning"
        });
        return;
      }
      if (!this.formCondition.symbol.label) {
        this.$message({
          title: "消息",
          message: "请把筛选条件填写完整",
          type: "warning"
        });
        return;
      }
      if (!this.formCondition.fieldValue) {
        this.$message({
          title: "消息",
          message: "请把筛选条件填写完整",
          type: "warning"
        });
        return;
      }
      if (!this.formCondition.way) {
        this.$message({
          title: "消息",
          message: "请把筛选条件填写完整",
          type: "warning"
        });
        return;
      }

      var inputOrselect = "";
      var inputOrselectCode = "";
      var condition = "";
      var conditionCode = "";

      this.selectTrue == true
        ? (inputOrselect = this.formCondition.fieldValue.dicName)
        : (inputOrselect = this.formCondition.fieldValue);
      this.selectTrue == true
        ? (inputOrselectCode = this.formCondition.fieldValue.dicCode)
        : (inputOrselectCode = this.formCondition.fieldValue);
      //包含或且条件
      if (this.formCondition.way.label == undefined) {
        condition =
          this.formCondition.field.fieldCnName +
          this.formCondition.symbol.label +
          inputOrselect;
        if (
          this.formCondition.symbol.label == "包含" ||
          this.formCondition.symbol.label == "不包含"
        ) {
          conditionCode =
            this.formCondition.field.fieldName +
            this.formCondition.symbol.value +
            "'" +
            "%" +
            inputOrselectCode +
            "%" +
            "'";
        } else {
          conditionCode =
            this.formCondition.field.fieldName +
            this.formCondition.symbol.value +
            "'" +
            inputOrselectCode +
            "'";
        }
      } else if (this.formCondition.way.label) {
        condition =
          this.formCondition.field.fieldCnName +
          this.formCondition.symbol.label +
          inputOrselect +
          this.formCondition.way.label;
        if (
          this.formCondition.symbol.label == "包含" ||
          this.formCondition.symbol.label == "不包含"
        ) {
          conditionCode =
            this.formCondition.way.value +
            "#" +
            this.formCondition.field.fieldName +
            "#" +
            this.formCondition.symbol.value +
            "#" +
            "'" +
            "%" +
            inputOrselectCode +
            "%" +
            "'" +
            "#" +
            this.formCondition.field.fieldType +
            "||| ";
        } else {
          conditionCode =
            this.formCondition.way.value +
            "#" +
            this.formCondition.field.fieldName +
            "#" +
            this.formCondition.symbol.value +
            "#" +
            "'" +
            inputOrselectCode +
            "'" +
            "#" +
            this.formCondition.field.fieldType +
            "||| ";
        }
      }
      this.tableCondition.push({ condition, conditionCode });
      this.formCondition = {
        field: "",
        symbol: "",
        fieldValue: "",
        way: ""
      };
      // console.log(this.tableCondition);
    },
    getCaption(obj, state) {
      var index = obj.indexOf("或");
      if (state == 0) {
        obj = obj.substring(0, index);
      } else {
        obj = obj.substring(index + 1, obj.length);
      }
      return obj;
      //   console.log(this.getCaption(data, 0))
      // console.log(this.getCaption(data, 1))
    },
    getCaptionCode(obj, state) {
      var index = obj.indexOf("|||");
      if (state == 0) {
        obj = obj.substring(0, index);
      } else {
        obj = obj.substring(index + 1, obj.length);
      }
      return obj;
      //   console.log(this.getCaption(data, 0))
      // console.log(this.getCaption(data, 1))
    },
    init() {
      if (this.expressiondata) {
        var data = this.expressiondata[0].describe;
        var dataCode = this.expressiondata[0].expression;
        var arr = data.split("");
        var arrCode = dataCode.split("");
        var num = 0
        // console.log(dataCode);
        // console.log('-----')
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == "或" || arr[i] == "且") {
            // var index = data.indexOf(this.getCaption(data, 0))
            var length = this.getCaption(data, 0).length;
            var a = arr.splice(0, length + 1);
            // data = data.substring(index,length)
            // console.log(length)
            this.tableCondition.push({
              conditionCode: "",
              condition: a.join("")
            });
            
          }
          
          
        }
        // console.log(this.tableCondition)
        for(var j=0;j<arrCode.length;j++){
          if(arrCode[j] == '|'){
            var lengthCode = this.getCaptionCode(dataCode, 0).length;
            var aCode = arrCode.splice(0, lengthCode + 3);
            // console.log(this.tableCondition[num])
            if(!this.tableCondition[num]){
              this.tableCondition[num].conditionCode = aCode.join("")
              // console.log(num)
              num ++
            }
          }
        }
        this.tableCondition.push({
          conditionCode: arrCode.join(""),
          condition: arr.join("")
        });
        // console.log(arr);
        // console.log('------')
        // console.log(this.tableCondition);
        this.options_ = this.fieldData;
      }
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    fieldData: {
      handler: function(newVal, oldVal) {
        this.options_ = newVal;
        for (var i in this.formCondition) {
          this.formCondition[i] = "";
        }
      },
      deep: true,
      immediate: true
    },
    cedata: {
      handler: function(newVal, oldVal) {
        for (var i in this.formCondition) {
          this.formCondition[i] = "";
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
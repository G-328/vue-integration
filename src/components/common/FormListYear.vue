<template>
  <!--  -->
  <div class="form_list" style="width:100%">
    <el-form ref="form" label-width="100px" :inline="true" label-position="top">
      <el-row>
        <el-col :span="8" v-for="item in listData" :key="item.id">
          <!-- 文本框 -->
          <el-form-item
            v-if="item.inputClass=='input' && item.field_type != '3'"
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
          >
            <el-input v-model="item[item.fieldName]" :disabled="item.isOnlyRead == '1'"></el-input>
          </el-form-item>
          <!-- 文本域 -->
          <el-form-item
            v-if="item.inputClass=='textarea'"
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            style="color:red"
          >
            <el-input type="textarea" v-model="item[item.fieldName]" :disabled="item.disabled"></el-input>
          </el-form-item>
          <!-- 时间框 -->
          <el-form-item
            :label="item.fieldCnName+':'"
            v-if="item.field_type=='3'"
            :required="item.isRequired == '1'"
          >
            <el-date-picker
              v-model="item[item.fieldName]"
              type="datetime"
              placeholder="请选择日期时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="0000-00-00 00:00:00"
              :disabled="item.disabled"
            ></el-date-picker>
          </el-form-item>
          <!-- 时间框范围 -->
          <el-form-item
            :label="item.fieldCnName+':'"
            v-if="item.inputClass=='dateRange'"
            :required="item.isRequired == '1'"
          >
            <el-date-picker
              v-model="item[item.fieldName]"
              type="datetimerange"
              range-separator="至"
              placeholder="请选择日期时间"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :disabled="item.disabled"
            ></el-date-picker>
          </el-form-item>
          <!-- 单选下拉 -->
          <el-form-item
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            value-key="id"
            v-if="item.inputClass=='select' && item.referenceType == '1'"
          >
            <el-select v-model="item[item.fieldName]" placeholder="请选择" 
            @focus="selectChange(item)" :disabled="item.disabled">
              <el-option
                v-for="item1 in item.referenceList"
                :key="item1.dicCode"
                :value="item1.dicCode"
                :label="item1.dicName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            value-key="id"
            v-if="item.inputClass=='select' && item.referenceType == '2'"
          >
            <el-select v-model="item[item.fieldName]" placeholder="请选择" 
            @focus="selectChange(item)" :disabled="item.disabled">
              <el-option
                v-for="item1 in item.referenceList"
                :key="item1.archivesClassifyId"
                :value="item1.archivesClassifyId"
                :label="item1.archivesClassifyName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            value-key="id"
            v-if="item.inputClass=='select' && item.referenceType == '3' && item.selectType_text == '数据字典'"
          >
            <el-select v-model="item[item.fieldName]" placeholder="请选择"
            @focus="selectChange(item)" :disabled="item.disabled" value-key="dicName">
              <el-option
                v-for="item1 in item.referenceList"
                :key="item1.dicCode"
                :value="item1"
                :label="item1.dicName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            value-key="id"
            v-if="item.inputClass=='select' && item.referenceType == '3' && item.selectType_text == '档案分类'"
          >
            <el-select v-model="item[item.fieldName]" placeholder="请选择" 
            @focus="selectChange(item)" :disabled="item.disabled" value-key="archivesClassifyName">
              <el-option
                v-for="item1 in item.referenceList"
                :key="item1.archivesClassifyCode"
                :value="item1"
                :label="item1.archivesClassifyName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            value-key="id"
            v-if="item.inputClass=='select' && item.referenceType == '3' && item.selectType_text == '组织机构'"
          >
            <el-select v-model="item[item.fieldName]" placeholder="请选择" 
            @focus="selectChange(item)" :disabled="item.disabled" value-key="archivesClassifyName">
              <el-option
                v-for="item1 in item.referenceList"
                :key="item1.archivesClassifyCode"
                :value="item1"
                :label="item1.archivesClassifyName"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 多选下拉 -->
          <el-form-item
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            v-if="item.inputClass=='checkBox'"
          >
            <el-select
              v-model="item[item.fieldName]"
              placeholder="请选择"
              multiple
              filterable
              allow-create
              default-first-option
              :disabled="item.disabled"
            >
              <el-option
                v-for="item1 in item.child"
                :key="item1.id"
                :value="item1.dicCode"
                :label="item1.dicName"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 多选框 -->
          <el-form-item
            :label="item.fieldCnName+':'"
            v-if="item.inputClass=='checkBox1'"
            :required="item.isRequired == '1'"
          >
            <el-checkbox-group v-model="item[item.fieldName]" :disabled="item.disabled">
              <el-checkbox v-for="item1 in item.options" :key="item1.key" :label="item1.value"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  getAllValue
} from "@/api/fileCollect";
export default {
  props: ["listData"],
  data() {
    return {
      //必填项字段及名称
      requiredNameList: [],
      requiredList: [],
      ruleForm: [],
      getArr:[],
    };
  },
  beforeMount() {
    // this.listData.forEach(item => {
    //   //获取必填项的字段和名称以便校验是否空值
    //   if (item.required) {
    //     this.requiredList.push(item.fieldName);
    //     this.requiredNameList.push(item.fieldCnName);
    //   }
    // });
    
    
  },
  methods: {
    //提交校验
    checkValue() {
      for (var key in this.listData) {
        if (
          this.requiredList.indexOf(key) !== -1 &&
          (this.listData[key] == "" || this.listData[key] == null)
        ) {
          let index = this.requiredList.indexOf(key);
          this.$message({
            title: "温馨提示",
            message: this.requiredNameList[index] + "为空",
            type: "warning"
          });
        } else {
        }
      }
    },
    selectChange(item){
      // console.log(item)
      // getAllValue({
      //         id: item.REFERENCE_ID,
      //         refType: item.REFERENCE_TYPE,
      //         selectType: item.SELECT_TYPE
      //       }).then(res => {
      //       this.$set(item, item.child, res.data);
      //         // console.log(res)
      //         item.child = res.data
      //       });
    }
  },
  mounted(){
    // console.log(this.listData)
  },
  watch:{
    // listData:{
    //   handler:function(newVal,oldVal){
    //     this.getArr = this.listData
        
    //   },
    //   deep : true,
    //   immediate : true
    // }
  }
};
</script>

<style lang="less" scoped>
.form_list {
  .el-form-item {
    width: 100%;

    .el-form-item__label {
      font-weight: 600;
    }
    .el-form-item__content {
      width: 64%;
      .el-select,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }
      .el-textarea__inner {
        font-family: "思源黑体";
      }
      .el-checkbox__label {
      }
    }
  }
  .el-col-12 {
    .el-form-item__content {
      width: 84% !important;
    }
  }
  .el-col-24 {
    .el-form-item__content {
      width: 92% !important;
    }
  }
}
// .el-picker-panel__footer {
//   .el-button {
//     background: @themeColor !important;
//   }
//   .el-button + .el-button {
//     background: @themeColor !important;
//   }
// }
.el-form--inline.el-form--label-top .el-form-item__content{
  display: inherit !important;
  margin-left:10px
}
.form_list .el-form-item .el-form-item__label{
  min-width: 138px;
}
</style>
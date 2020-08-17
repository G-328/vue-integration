<template>
  <!--  -->
  <div class="form_list" style="width:100%">
    <el-form ref="form" label-width="100px" :inline="true" label-position="right">
      <el-row>
        <el-col :span="Number(item.showWidth)" v-for="item in listData" :key="item.id">
          <!-- 文本框 -->
          <el-form-item
            v-if="item.inputClass == 'input' && item.fieldType == '1'"
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
          >
            <el-input v-model="item[item.fieldName]" :disabled="item.type == true"></el-input>
          </el-form-item>
          <!-- 文本域 -->
          <el-form-item
            v-if="item.inputClass == 'textarea'"
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            style="color:red"
          >
            <el-input type="textarea" v-model="item[item.fieldName]" :disabled="item.type == true"></el-input>
          </el-form-item>
          <!-- 时间框 -->
          <el-form-item
            :label="item.fieldCnName+':'"
            v-if="item.inputClass == 'date'"
            :required="item.isRequired == '1'"
          >
            <el-date-picker
              v-model="item[item.fieldName]"
              :disabled="item.type == true"
              type="datetime"
              placeholder="请选择日期时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="0000-00-00 00:00:00"
            ></el-date-picker>
          </el-form-item>
          <!-- 时间框范围 -->
          <el-form-item
            :label="item.fieldCnName+':'"
            v-if="item.inputClass == 'dateRange'"
            :required="item.isRequired == '1'"
          >
            <el-date-picker
              v-model="item[item.fieldName]"
              :disabled="item.type == true"
              type="datetimerange"
              range-separator="至"
              placeholder="请选择日期时间"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <!-- 下拉框 -->
          <el-form-item
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            v-if="item.inputClass == 'select' && item.selectType == '1'"
          >
            <!-- @focus="getOptions1(item.referenceId, item)" -->

            <el-select v-model="item[item.fieldName]" :disabled="item.type == true" placeholder>
              <el-option
                v-for="item1 in item.referenceList"
                :key="item1.dicId"
                :value="item1.dicCode"
                :label="item1.dicName"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 下拉树 -->
          <el-form-item
            :disabled="item.type == true"
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            v-if="item.inputClass == 'select' && item.selectType == '2'
            "
          >
            <el-cascader
              v-model="item[item.fieldName]"
              placeholder
              :disabled="item.type == true"
              :options="item.referenceList"
              :props="defaultProps2"
              :show-all-levels="false"
            ></el-cascader>
          </el-form-item>
          <!-- // -->
          <el-form-item
            :disabled="item.type == true"
            :label="item.fieldCnName+':'"
            :required="item.isRequired == '1'"
            v-if="item.inputClass == 'select' && item.selectType == '3'
            "
          >
            <el-cascader
              v-model="item[item.fieldName]"
              placeholder
              :options="item.referenceList"
              :disabled="item.type == true"
              :props="defaultProps3"
              :show-all-levels="false"
              @change="cascaderChange"
            ></el-cascader>
          </el-form-item>
          <!-- 数字框 -->
          <el-form-item
            :disabled="item.type == true"
            :label="item.fieldCnName+':'"
            v-if="item.inputClass == 'input' && item.fieldType == '2' && item.fieldAccuracy "
            :required="item.isRequired == '1'"
          >
            <el-input-number v-model="item[item.fieldName]"></el-input-number>
          </el-form-item>
          <el-form-item
            :disabled="item.type == true"
            :label="item.fieldCnName+':'"
            v-if="item.inputClass == 'input' && item.fieldType == '2' && !item.fieldAccuracy "
            :required="item.isRequired == '1'"
          >
            <el-input-number v-model="item[item.fieldName]" :min="0" :max="1000000"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import DonMessage from '@/assets/js/message'
export default {
  
  props: ["listData", "listValue", "type_"],
  data() {
    return {
      //必填项字段及名称
      requiredNameList: [],
      requiredList: [],
      ruleForm: [],
      options1: [],
      options2: [],
      checkedIdTemplate: "",
      defaultProps: {},
      defaultProps1: {
        children: "child",
        label: "dicClassifyName",
        value: "dicclassifyId",
        checkStrictly: false
      },
      defaultProps2: {
        children: "child",
        label: "archivesClassifyName",
        value: "archivesClassifyCode",
        checkStrictly: true //可选任意一层
      },
      defaultProps3: {
        children: "child",
        label: "name",
        value: "code",
        checkStrictly: true
      }
    };
  },
  beforeMount() {
    console.log("beforeMount")
    console.log(this.listData)
    this.listData.forEach(item => {
      //获取必填项的字段和名称以便校验是否空值
      if (item.isRequired == "1") {
        this.requiredList.push(item.fieldName);
        this.requiredNameList.push(item.fieldCnName);
      }
    });
  },
  methods: {
    cascaderChange(data) {
      // console.log(data);
    },
    treeChangeTemplate(row, seleted, keys) {
      // this.forms.templateId = row.id;
      // this.forms.templateName = row.text;
    },
    handleNodeClickTemplate(data, checked, node) {
      if (checked == true) {
        this.checkedIdTemplate = data.id;
        this.$refs.treeTemplate.setCheckedKeys([data.id]);
      } else {
        if (this.checkedIdTemplate == data.id) {
          this.$refs.treeTemplate.setCheckedKeys([data.id]);
        }
      }
    },
    //提交校验
    checkValue() {
      console.log("checkValue")
      console.log(this.listData)
        this.listData.forEach(item => {
          if (item.isRequired == 1) { 
            if (!item[item.fieldName]) {
              this.$store.commit("CHANGE_FORMSTATUS", '1');
              DonMessage.warning( item.fieldCnName + "不能为空！")
            } 
            setTimeout(res => {
              if(item[item.fieldName]){
                this.$store.commit("CHANGE_FORMSTATUS", '0');
              }
            },0)
          }
        });
    }
  }
};
</script>
<style lang="less">
.form_list {
  .el-form-item {
    width: 100%;
    .el-form-item__label {
      font-weight: 600;
    }
    .el-form-item__content {
      width: 68%;
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

  .el-col-8 {
    .el-form-item__content {
      width: 62%;
    }
  }
  .el-col-12 {
    .el-form-item__content {
      width: 84%;
    }
  }
  .el-col-24 {
    .el-form-item__content {
      width: 92%;
    }
  }
}
.el-form--inline.el-form--label-top .el-form-item__content {
  display: inherit !important;
  margin-left: 10px;
}
.form_list .el-form-item .el-form-item__label {
  min-width: 80px;
}
.el-input-number--small{
  width: 100%;
}
</style>

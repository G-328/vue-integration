<template>
  <div class="body">
    <h1>档案借阅申请单据</h1>
    <div class="table_body" v-show="bodyFlag">
      <ul>
        <li>借阅人</li>
        <li>
          <el-input v-model="getArrCar.borrowUser"></el-input>
        </li>
        <li>部门</li>
        <li style="border-right:none">
          <el-input v-model="getArrCar.department"></el-input>
        </li>
      </ul>
      <ul>
        <li>借阅申请时间</li>
        <li>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="getArrCar.creatTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </li>
        <li>电话</li>
        <li style="border-right:none">
          <el-input v-model="getArrCar.phone"></el-input>
        </li>
      </ul>
      <ul>
        <li>利用方式</li>
        <li>
          <el-radio v-model="getArrCar.useType" label="电子借阅">电子借阅</el-radio>
          <el-radio v-model="getArrCar.useType" label="实体借阅">实体借阅</el-radio>
          <el-radio v-model="getArrCar.useType" label="实体查阅">实体查阅</el-radio>
        </li>
        <li>电子利用方式</li>
        <li style="border-right:none">
          <el-radio v-model="getArrCar.eUseType" label="查看">查看</el-radio>
          <el-radio v-model="getArrCar.eUseType" label="打印">打印</el-radio>
          <el-radio v-model="getArrCar.eUseType" label="下载">下载</el-radio>
        </li>
      </ul>
      <ul>
        <li>档案门类</li>
        <li>
          <el-select v-model="getArrCar.category" placeholder="请选择">
            <el-option
              v-for="item in fileOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li>借阅人登记</li>
        <li style="border-right:none">
          <el-input v-model="getArrCar.registrant"></el-input>
        </li>
      </ul>
      <ul class="talble_bottom_1">
        <li>借阅目的</li>
        <li style="border-right:none">
          <el-select v-model="getArrCar.objective" placeholder="请选择">
            <el-option
              v-for="item in objOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
      </ul>
      <ul class="talble_bottom_2">
        <li>申请借阅档案信息</li>
        <li style="border-right:none"></li>
      </ul>
    </div>
    <div class="table_body" v-show="!bodyFlag">
      <ul>
        <li>借阅人</li>
        <li>
          <el-input v-model="getArr.borrowUser"></el-input>
        </li>
        <li>部门</li>
        <li style="border-right:none">
          <el-input v-model="getArr.department"></el-input>
        </li>
      </ul>
      <ul>
        <li>借阅申请时间</li>
        <li>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="getArr.creatTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </li>
        <li>电话</li>
        <li style="border-right:none">
          <el-input v-model="getArr.phone"></el-input>
        </li>
      </ul>
      <ul>
        <li>利用方式</li>
        <li>
          <el-radio v-model="getArr.useType" label="电子借阅">电子借阅</el-radio>
          <el-radio v-model="getArr.useType" label="实体借阅">实体借阅</el-radio>
          <el-radio v-model="getArr.useType" label="实体查阅">实体查阅</el-radio>
        </li>
        <li>电子利用方式</li>
        <li style="border-right:none">
          <el-radio v-model="getArr.eUseType" label="查看">查看</el-radio>
          <el-radio v-model="getArr.eUseType" label="打印">打印</el-radio>
          <el-radio v-model="getArr.eUseType" label="下载">下载</el-radio>
        </li>
      </ul>
      <ul>
        <li>档案门类</li>
        <li>
          <el-select v-model="getArr.category" placeholder="请选择">
            <el-option
              v-for="item in fileOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li>借阅人登记</li>
        <li style="border-right:none">
          <el-input v-model="getArr.registrant"></el-input>
        </li>
      </ul>
      <ul class="talble_bottom_1">
        <li>借阅目的</li>
        <li style="border-right:none">
          <el-select v-model="getArr.objective" placeholder="请选择">
            <el-option
              v-for="item in objOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
      </ul>
      <ul class="talble_bottom_2">
        <li>申请借阅档案信息</li>
        <li style="border-right:none"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSizeArr: [10, 20, 30],
      pageSize: 20,
      getJSON: [],
      Description: false,
      bodyFlag: true,
      fileOptions: [
        {
          label: "文书类档案",
          value: "文书类档案"
        },
        {
          label: "视频类档案",
          value: "视频类档案"
        }
      ],
      objOptions: [
        {
          label: "学术研究",
          value: "学术研究"
        },
        {
          label: "专业性学术研究参考",
          value: "专业性学术研究参考"
        }
      ],
      //借阅申请
      getArr: {
        borrowUser: "",
        department: "",
        creatTime: "",
        phone: "",
        useType: "",
        eUseType: "",
        category: "",
        registrant: "",
        objective: "",
        infoId: "",
        fInfoId: "",
        type: 2, //"(1为添加到借阅车，2为已提交借阅申请)",
        creatBy: "创建人",
        tableName: "", //
        formKey: "JDSQ",
        formKeyName: "借阅申请",
        userName: "admin",
        userAccount: "admin"
      },
      // 借阅车
      getArrCar: {
        lendingId: "",
        borrowUser: "",
        department: "",
        creatTime: "",
        phone: "",
        useType: "",
        eUseType: "",
        category: "",
        registrant: "",
        objective: "",
        infoId: "",
        fInfoId: "",
        type: 1, //"(1为添加到借阅车，2为已提交借阅申请)",
        creatBy: "创建人",
        tableName: "" //
      }
    };
  },
  computed: {
    searchData_() {
      return this.$store.state.searchData;
    },
    BorrowCarData_() {
      return this.$store.state.BorrowCarData;
    }
  },
  methods: {},
  mounted() {
    // console.log(this.BorrowCarData_);
    this.getArr.infoId = this.BorrowCarData_[0].id;
    this.getArr.tableName = this.BorrowCarData_[0].tableName;
    this.getArrCar.infoId = this.BorrowCarData_[0].id;
    this.getArrCar.tableName = this.BorrowCarData_[0].tableName;
  },
  watch: {
    searchData_: {
      handler: function(newVal, oldVal) {
        // console.log(newVal);
      },
      deep: true,
      immediate: true
    },
    BorrowCarData_: {
      handler: function(newVal, oldVal) {
        // console.log(newVal);
        if (newVal[1] == 1) {
          this.bodyFlag = true;
          // console.log(this.bodyFlag);
        } else {
          this.bodyFlag = false;
          // console.log(this.bodyFlag);
        }
        if (this.BorrowCarData_[2] != "") {
          this.getArrCar.lendingId = this.BorrowCarData_[2];
        }
      },
      deep: true
    }
  }
};
</script>
<style>
.table_body .el-input__inner{
  border:none !important
}
</style>
<style lang="less" scoped>
.body {
  width: 100%;
  background: white;
  .el-input {
    width: 60%;
    .el-input__inner {
      border: 1px solid white !important;
    }
  }
  h1 {
    text-align: center;
  }
  .table_body {
    width: 100%;
    height: auto;
    border: 1px solid black;
    .el-input__inner {
      border: 1px solid white !important;
    }
    li {
      float: left;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      height: 50px;
      line-height: 50px;
    }
    li:nth-child(1) {
      width: 20%;
    }
    li:nth-child(2) {
      width: 30%;
    }
    li:nth-child(3) {
      width: 20%;
    }
    li:nth-child(4) {
      width: 30%;
    }
    .talble_bottom_1 {
      width: 100%;
      height: 80px;
      li:first-child {
        width: 20%;
        height: 80px;
      }
      li:last-child {
        width: 80%;
        height: 80px;
      }
    }
    .talble_bottom_2 {
      width: 100%;
      height: auto;
      li:first-child {
        border-bottom: none;
        width: 20%;
        height: 80px;
      }
      li:last-child {
        border-bottom: none;
        width: 80%;
        height: 80px;
      }
    }
  }
}
</style>
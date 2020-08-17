<template>
  <div class="body" ref="body">
    <div class="first">
      <div class="num">共找到相关结果{{searchData_.total}}条</div>
      <el-button class="car" size="small" @click="$router.push('/archivesUtilize/borrowTheCar')">查看借阅车</el-button>
    </div>
    <div style="display: flex; justify-content: space-between;margin-top:20px">
      <div class="center">
        <div class="center-row" v-for="(item,i) in arr" :key="i" @click="searchFileSec(item)">
          <div class="header">
            <h2 class="CAspan" v-html="item.FILE_NAME.split('.')[0]"></h2>
           
            <span
              :data-row="JSON.stringify(item)"
              class="jj"
              @click="addBorrowCarFn($event,3)"
              v-if="item.ARCHIVE_METHOD == '1'"
            >收藏</span>
            <span :data-row="JSON.stringify(item)" class="j" @click="addBorrowCarFn($event,2)">借阅</span>
            <span
              :data-row="JSON.stringify(item)"
              class="jcar"
              @click="addBorrowCarFn($event,1)"
            >添加到借阅车</span>
          </div>

          <ul class="position">
            <li>
              所在全宗：
              <span>{{item.FONDS_NAME}}</span>
            </li>
            <li>
              库房存址：
              <span>标准档案库</span>
            </li>
            <li>
              文件名称：
              <span v-html="item.FILE_NAME.split('.')[0]"></span>
            </li>
          </ul>
          <div class="element">
            <b>著录项：</b>
            <span v-for="(itemChild,index) in item.xinzeng" :key="index" v-if="item[itemChild[0]] != null">
              {{itemChild[1]}} :
              <span v-html="item[itemChild[0]]"></span>;
            </span>
          </div>
          <div class="text" style="margin-top:5px">
            <b style="float:left;">文件内容：</b>
            <div v-html="item.FILE"></div>
          </div>
        </div>
      </div>
      <div v-show="isShowRight" class="right">
        <span class="hide" @click="isShowRight = false">隐藏</span>
        <div>全宗:
          <div class="rightContent">
            <p v-for="(item, index) in arrF" :key="index">{{item.type}}({{item.total}})</p>
          </div>
        </div>
        <div>档案门类:
          <div class="rightContent">
            <span v-for="(item, index) in arrA" :key="index">{{item.type}}({{item.total}})</span>
          </div>
        </div>
        <div>年度:
          <div class="rightContent">
            <span v-for="(item, index) in arrY" :key="index">{{item.type}}({{item.total}})</span>
          </div>
        </div>
        <div>部门:
          <div class="rightContent">
            <span v-for="(item, index) in arrO" :key="index">{{item.type}}({{item.total}})</span>
          </div>
        </div>
        <!-- <div>保管期限:
          <div class="rightContent">
            <span v-for="(item, index) in arrR" :key="index">{{item.type}}({{item.total}})</span>
          </div>
        </div> -->
      </div>
      <p class="showRight" v-show="!isShowRight" @click="isShowRight = true">展示</p>
      <!-- <p class="backTop" @click="backTop">↑</p> -->
    </div>

    <el-dialog
      title="新增"
      :visible.sync="lendingFlag"
      width="85%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-dialogDrag
    >
      <div>
        <lendingList ref="lending"></lendingList>
      </div>
      <div slot="footer" class="Stripebottom dialog-footer">
        <el-button @click="addfn">提交</el-button>
        <el-button @click="lendingFlag = false">关闭</el-button>
      </div>
    </el-dialog>
    <!--  -->
    <!-- 查看详情 -->
    <!-- <el-dialog
      title="查看详情"
      :visible.sync="isShowDetails"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-dialogDrag
    >
        <el-col :span="24">
          <div class="borrowDetails">
            <el-form
              :span="24"
              ref="formsDetails"
              size="mini"
              :inline="true"
              label-width="20px"
              label-position="right"
            > -->
              <!-- :model="formsDetails" -->
              <!-- <el-form-item :label="formsDetails.archiveName">
                <el-input v-model="formsDetails.description"></el-input>
              </el-form-item> -->
              <!-- <template v-for="item in formsDetails">
                <el-form-item :label="item.label">
                  <el-input readonly="readonly" v-model="item.text"></el-input>
                </el-form-item>
              </template>
            </el-form>
          </div>
        </el-col>
      <div slot="footer" class="Stripebottom dialog-footer">
        <el-button @click="isShowDetails = false">关闭</el-button>
      </div>
    </el-dialog> -->
    <!-- 单条借阅 -->
    <el-dialog
      title="提交借阅申请"
      :visible.sync="isShowOneLibrary"
      width="60%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-dialogDrag
    >
      <div v-show="tableLibrary.length != 0" ref="print">
        <el-row>
          <h1 class="HH">档案借阅申请单据</h1>
          <table class="table" border="1" cellspacing="0">
            <col width="150px" />
            <col width="350px" />
            <col width="150px" />
            <col width="350px" />
            <tr height="40px">
              <td colspan="" align="left">借阅人</td>
              <td colspan="" align="left">
                <input type="text" v-model="formsLibrary.user" placeholder="请输入"></input>
              </td>
              <td colspan="" align="left">部门</td>
              <td colspan="" align="left">
                <input type="text" v-model="formsLibrary.department" placeholder="请输入"></input>
              </td>
            </tr>
            <tr height="40px">
              <td colspan="" align="left">借阅申请日期</td>
              <td colspan="" align="left">{{formsLibrary.monitorTime}}</td>
              <td colspan="" align="left">电话</td>
              <td colspan="" align="left">
                <input type="text" v-model="formsLibrary.phone" placeholder="请输入"></input>
              </td>
            </tr>
            <tr height="40px">
              <td colspan="" align="left">实体利用方式</td>
              <td colspan="" align="left">
                <el-radio v-model="formsLibrary.radio" label="实体借阅"></el-radio>
                <el-radio v-model="formsLibrary.radio" label="实体查询"></el-radio>
              </td>
              <td colspan="" align="left">电子利用方式</td>
              <td colspan="" align="left">
                <el-radio v-model="formsLibrary.radio" label="查看"></el-radio>
                <el-radio v-model="formsLibrary.radio" label="打印"></el-radio>
                <el-radio v-model="formsLibrary.radio" label="下载"></el-radio>
              </td>
            </tr>
            <tr height="40px">
              <td colspan="" align="left">档案门类</td>
              <td colspan="" align="left">{{formsLibrary.category}}(提示：不同档案门类请分开借阅)</td>
              <td colspan="" align="left">借阅登记人</td>
              <td colspan="" align="left">
                <input type="text" v-model="formsLibrary.bUser" placeholder="请输入"></input>
              </td>
            </tr>
            <tr height="80px">
              <td colspan="" align="left">借阅目的</td>
              <td colspan="3" align="left">
                <el-select style="width:20%;margin-left:10px" v-model="formsLibrary.value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr height="40px">
              <td align="left">申请借阅档案信息</td>
              <td colspan="3" align="left">
                <div class="applyMessage">
                  <p>添加档案</p>
                  <Table
                    :titleData="titleLibrary"
                    :tableData="tableLibrary"
                    :showSelection="false"
                    height="calc(100vh - 700px)"
                    :showOperate="false"
                    :showText="true"
                  ></Table>
                </div>
              </td>
            </tr>
          </table>
        </el-row>
      </div>
      <div slot="footer" class="Stripebottom dialog-footer">
        <el-button @click="isShowOneLibrary = false">取消</el-button>
        <el-button @click="doPrint">打印单据</el-button>
        <el-button @click="loanApp">保存登记单</el-button>
      </div>
    </el-dialog>
    <!--  -->
    <el-dialog
      :visible.sync="originFlag"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-dialogDrag
    >
      <div>
        <el-row>
          <el-col :span="24">
            <div style="height:1200px;padding-right:20px">
              <iframe
                id="center"
                :src="originSrc"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="auto"
              ></iframe>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="Stripebottom dialog-footer">
        <el-button @click="originFlag = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import lendingList from "./lendingList";
import Table from "../common/Table";
import Interface from "@/api/fileRetrieval";

export default {
  components: {
    lendingList,
    // tableElement
    Table
  },
  data() {
    return {
      originFlag: false,
      originSrc: "",
      arr: [],
      //
      arrF: [], //全宗
      arrO: [], //部门
      arrY: [], //年度
      arrR: [], //保管期限
      arrA: [], //档案门类
      treeData: [],
      defaultProps: {
        children: "children",
        label: "text"
      },
      forms: {
        archiveName: "",
        description: "",
      },
      isShowOneLibrary: false, 
      archiveName: "",
      archiveNameOptions: [],
      currentPage: 1,
      pageSizeArr: [10, 20, 30],
      pageSize: 20,
      getJSON: [],
      isShowRight: true,
      lendingFlag: false,
      jnDiolog: false,
      rowVal: [],
      rowValArr: [],
      addstatus: 1,
      lendId: "",
      total: 0,
      one: "ssss",
      options: [{
        value: '学术研究',
        label: '学术研究'
      }, {
        value: '专业性学术研究参考',
        label: '专业性学术研究参考'
      }],
      titleLibrary: [
        {
          label: "档号",
          prop: "DH",
          align: "center"
        },
        {
          label: "归档部门",
          prop: "GDBM",
          align: "center"
        },
        {
          label: "题名",
          prop: "TM",
          align: "center"
        },
        {
          label: "密级",
          prop: "MJ",
          align: "center"
        },
      ],
      tableLibrary: [
        {ARCHIVE_NAME: "1",ORGANIZATIONA_CODE: "1", TM: "wqewq", SECURITY_CLASSIFICATION: "2"}
      ],
      allTime: "",
      // batch: "", //批量借阅还是单个借阅
      formsLibrary: {
        user: "", //借阅人
        department: "", //部门
        monitorTime: "", //当前时间
        phone: "", //电话
        radio: "", 
        category: "", //档案门类
        bUser: "", //借阅登记人
        value: "", //下拉框的值
        id: "", //
        // creatBy: "陈澳",
        creatBy: sessionStorage.getItem('user'),
        tableName: "",
        archiveName: "",
        title: "", //题号
        archiveNum: "", //档号
      }
    };
  },
  computed: {
    searchData_() {
      return this.$store.state.searchData;
    },
  },
  methods: {
    doPrint() {
      this.$print(this.$refs.print)
    },
    searchFileSec(data) {
      console.log("searchFileSec")
      console.log(data)
      let obj = {}
      for (let key in data) {
        if (key == "FILE" || key == "xinzeng" || key == "ZLX") {
          break;
        }else {
          obj[key] = data[key]
        }
      }
      // console.log("object")
      // console.log(obj)
      // this.originFlag = true
      // this.originSrc = "https://www.baidu.com"
      Interface.searchFileSec({obj}).then(res => {
        if (res.code == true) {
          this.originFlag = true
          this.originSrc = obj.ADDRESS
          // this.originSrc = "https://www.baidu.com"
        }else {
          this.$message({
            title: "消息",
            message: res.data,
            type: "error"
          });
        }
      })
    },
    addBorrowCarFn(ev, status) {
      event.preventDefault();
      event.stopPropagation();
      // var data = ev.target.dataset.row;
      // var arr = [];
      // this.getJSON = JSON.parse(data);
      // arr.push(this.getJSON);
      // arr.push(status);
      // arr.push(this.lendId);
      // this.addstatus = status;
      // this.lendingFlag = true;
      // this.$store.commit("GET_BORROWCAR", arr);
      // 后写的
      // console.log("addBorrowCarFn")
      // console.log(ev)
      var data = JSON.parse(ev.target.dataset.row);
      var arr = []
      // console.log(data)
      if (status == 1) {
        arr.push({infoId: data.INFO_ID, creatBy: sessionStorage.getItem('user'), tableName: data.TABLE_NAME, archiveName: data.ARCHIVE_NAME, title: data.TM, archiveNum: data.DH})
        Interface.addBorrowCar({
          condition: arr
        }).then(res => {
          if (res.code == true) {
            this.$message({
              title: "消息",
              message: res.msg,
              type: "success"
            });
          }
        })
      }else if(status == 2) {
        this.isShowOneLibrary = true
        this.tableLibrary = []
        this.tableLibrary.push(data)
        this.formsLibrary.category = data.ARCHIVE_NAME
        this.formsLibrary.id = data.INFO_ID
        this.formsLibrary.tableName= data.TABLE_NAME
        this.formsLibrary.archiveName= data.ARCHIVE_NAME
        this.formsLibrary.title= data.TM
        this.formsLibrary.archiveNum= data.DH
        this.time();
      }else if (status == 3) {
        let arr = []
        arr.push({
          archiveTableId: data.ARCHIVE_TABLE_ID,
          directoryTableName: data.TABLE_NAME,
          archiveMethod: data.ARCHIVE_METHOD,
          infoId: data.INFO_ID,
          archiveDh: data.DH,
          archiveTm: data.TM
        })
        Interface.addCollect({
          infoList: arr
        }).then(res => {
          if (res.code == true) {
             this.$message({
              title: "消息",
              message: res.msg,
              type: "success"
            });
          }
        })
      }
    },
    addfn() {
      var json;
      if (this.addstatus == 1) {
        // console.log(this.$refs.lending.getArrCar);
        json = this.$refs.lending.getArrCar;
        Interface.addBorrowCar(json).then(res => {
          if (!res.code) {
            this.$message({
              title: "消息",
              message: res.data,
              type: "error"
            });
          } else {
            this.lendId = res.data;
            this.$message({
              title: "消息",
              message: res.data,
              type: "success"
            });
          }
        });
      } else {
        // console.log(this.$refs.lending.getArr);
        json = this.$refs.lending.getArr;
        Interface.loanApplication(json).then(res => {
          this.$message({
            title: "消息",
            message: res.data,
            type: "success"
          });
        });
      }
      this.lendingFlag = false;
    },
    // selectionChange(val) {
    //   console.log("val")
    //   console.log(val)
    //   let arr = []
    //   this.rowVal = []
    //   this.rowVal = val;
    //   this.rowVal.forEach(item => {
    //     arr.push(item.BORROW_ID)
    //   })
    //   this.rowValArr = arr
    //   console.log(this.rowValArr)
    //   this.tableLibrary = []
    //   this.tableLibrary = val
    // },

    // deletecheckCar() {
    //   Interface.deleteBorrowCar({
    //     borrowId: this.rowVal[0].borrowId
    //   }).then(res => {
    //     this.checkCar();
    //     this.$message({
    //       title: "消息",
    //       message: res.data,
    //       type: "success"
    //     });
    //   });
    // },
    // 打开借阅车页面
    // checkCar() {
    //   this.tableDataJn = [];
    //   this.jnDiolog = true;
    //   this.getTree();
    //   // Interface.getBorrowCarList({
    //   //   creatBy: "陈澳", //借阅人
    //   //   archiveName: "" //档案库名称
    //   //   // lendingId: this.lendId
    //   // }).then(res => {
    //   //   var data = res.data;
    //   //   data.forEach(item => {
    //   //     if (item.title) {
    //   //       this.tableDataJn.push(item);
    //   //     }
    //   //   });
    //   // });
    // },
    // 查看借阅车
    // specific() {
    //   console.log("specific")
    //   console.log(this.archiveName)
    //   var arr = []
    //   Interface.getBorrowCarList({
    //     creatBy: "陈澳", //借阅人
    //     archiveName: this.archiveName, //档案库名称
    //     // lendingId: this.lendId
    //   }).then(res => {
    //     if (res.code == true) {
    //       var data = res.data;
    //       var tableData = []
    //       data.forEach(item => {
    //         if (item.INFO_ID) {
    //           tableData.push(item);
    //           // this.tableDataJn.push(item);
    //         }else {
    //           arr.push(item)
    //         }
    //       });
    //       this.tableDataJn = tableData
    //       console.log(this.tableDataJn)
    //       arr.forEach(item =>{
    //         this.tableLabelJn.forEach(item1 => {
    //           if (item1.label == item.FIELD_ATTR) {
    //             item1.prop = item.FIELD_NAME
    //           }
    //         })
    //         // this.tableLabelJn.push({
    //         //   label: item.FIELD_CN_NAME,
    //         //   param: item.FIELD_NAME,
    //         //   align: "center",
    //         // })
    //       })
    //     }
    //   });
    // },
    // loanAppAll() {
    //   if (this.rowValArr.length == 0) {
    //     this.$message({
    //       title: "消息",
    //       message: "请选择一条数据操作",
    //       type: "error"
    //     })
    //     return
    //   }
    //   this.isShowOneLibrary = true
    //   // this.batch = false
    //   this.time();
    //   //
    //   // this.tableLibrary = []
    //   // this.tableLibrary.push(data)
    //   // // this.formsLibrary.department = data.ORGANIZATIONA_CODE
    //   // this.formsLibrary.category = data.ARCHIVE_NAME
    //   // this.formsLibrary.id = data.INFO_ID
    //   // this.formsLibrary.tableName= data.TABLE_NAME
    //   // this.formsLibrary.archiveName= data.ARCHIVE_NAME
    // },
    //保存借阅申请单据
    loanApp() {
      if (this.formsLibrary.user && this.formsLibrary.phone && this.formsLibrary.radio && this.formsLibrary.value && this.formsLibrary.bUser && this.formsLibrary.department) {
        if (!this.regExp(this.formsLibrary.phone)) {
          this.$message({
            title: "消息",
            message: "请输入正确的手机号码",
            type: "error"
          });
          return
        }
        let obj = this.formsLibrary.radio
        let obj1 = ''
        if (obj == "实体借阅" || obj == "实体查询") {
        }else {
          obj = ''
          obj1 = this.formsLibrary.radio
        }
        // console.log(this.formsLibrary)
        // if (this.batch) {
          Interface.loanApplication({
            borrowUser: this.formsLibrary.user, //借阅人
            department: this.formsLibrary.department, //部门
            creatTime: this.allTime, //时间
            phone: this.formsLibrary.phone, //电话
            useType: obj, //利用方式
            eUseType: obj1, //电子利用方式
            category: this.formsLibrary.category, //档案门类
            registrant: this.formsLibrary.bUser, //借阅登记人
            objective: this.formsLibrary.value, //借阅目的
            type: 2, //1为加入，2为提交
            infoId: this.formsLibrary.id, //当前档案id
            creatBy: this.formsLibrary.creatBy,
            tableName: this.formsLibrary.tableName,
            archiveName: this.formsLibrary.archiveName,
            title: this.formsLibrary.title, //题名
            archiveNum: this.formsLibrary.archiveNum // 档号
          }).then(res => {
            if (res.code == true) {
              this.$message({
                title: "消息",
                message: res.msg,
                type: "success"
              });
              this.isShowOneLibrary = false
              this.formsLibrary.user = ""
              this.formsLibrary.department = ""
              this.formsLibrary.phone = ""
              this.formsLibrary.radio = ""
              this.formsLibrary.bUser = ""
              this.formsLibrary.value = ""
            }else {
              this.$message({
                title: "消息",
                message: res.msg,
                type: "error"
              });
            }
          })
        // }else {
          // let obj2 = this.rowValArr.join(',')
          // console.log("object")
          // console.log(obj)
          // Interface.loanApplicationAll({
          //   borrowUser: this.formsLibrary.user, //借阅人
          //   department: this.formsLibrary.department, //部门
          //   creatTime: this.allTime, //时间
          //   phone: this.formsLibrary.phone, //电话
          //   useType: obj, //利用方式
          //   eUseType: obj1, //电子利用方式
          //   category: this.formsLibrary.category, //档案门类
          //   registrant: this.formsLibrary.bUser, //借阅登记人
          //   objective: this.formsLibrary.value, //借阅目的
          //   type: 2, //1为加入，2为提交
          //   creatBy: this.formsLibrary.creatBy,
          //   list: this.rowValArr
          //   // list: obj2
          //   // infoId: this.formsLibrary.id, //当前档案id
          //   // tableName: this.formsLibrary.tableName,
          //   // archiveName: this.formsLibrary.archiveName
          // }).then(res => {
          //   if (res.code == true) {
          //     this.$message({
          //       title: "消息",
          //       message: res.msg,
          //       type: "success"
          //     });
          //     this.isShowOneLibrary = false
          //     this.specific();
          //   }
          // }) 
        // }
      }else {
        this.$message({
          title: "消息",
          message: "请完善表单数据",
          type: "warning"
        })
      }
    },
    //回到顶部
    backTop() {
      // console.log(this.$refs.body.scrollTop)
      this.$refs.body.scrollTop = 0
    },
    // // 获取全宗树
    // getTree() {
    //   Interface.archiveTableTree({
    //     isAll : 0,
    //     fondId : '#root'
    //   }).then(res => {
    //     this.treeData = res.data;
    //   });
    // },
    // handleClick(Method) {
    //   if (Method == "delete") {
    //     // console.log("delete")
    //     // console.log(this.rowValArr)
    //     if (this.rowValArr.length == 0) {
    //       this.$message({
    //         title: "消息",
    //         message: "请选择一条数据操作",
    //         type: "error"
    //       })
    //       return 
    //     }
    //     Interface.deleteBorrowCar({
    //       list: this.rowValArr
    //     }).then(res => {
    //       if (res.code == true) {
    //         this.$message({
    //           title: "消息",
    //           message: res.msg,
    //           type: "success"
    //         });
    //         this.specific();
    //         this.rowValArr = []
    //       }else {
    //         this.$message({
    //           title: "消息",
    //           message: res.msg,
    //           type: "error"
    //         });
    //       }
    //     })
    //   }
    // },
    time() {
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      let hours = time.getHours()
      let minutes = time.getMinutes()
      let seconds = time.getSeconds()
      let arr = [year, month, day]
      let arr1 = [hours, minutes, seconds]
      let ymd = arr.join('')
      let ymd1 = arr.join('-')
      let hms = arr1.join(':')
      this.allTime = ymd1 + ' ' + hms
      this.formsLibrary.monitorTime = ymd
    },
    //匹配手机号
    regExp(val) {
      let reg = /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;
      return reg.test(val)
    }
  },
  mounted() {
    this.isShowRight = true
    // console.log(this.$store.state.searchData);
  },
  watch: {
    searchData_: {
      handler: function(newVal, oldVal) {
        // console.log("zuilimian")
        // console.log(newVal, oldVal);
        let arr = newVal.list
        let arr1 = newVal.group
        // console.log("ZLX")
        if (arr !== undefined) {
          // console.log("123123") 
          // console.log(arr)
          arr.forEach(item => {
            item.xinzeng = []
            JSON.parse(item.ZLX).forEach(item1 => {
              let arr = []
              arr.push(item1.FIELD_NAME.toUpperCase())
              arr.push(item1.FIELD_CN_NAME)
              item.xinzeng.push(arr)
            })
          })
          this.arr = arr

          this.arrF = []
          this.arrO = []
          this.arrY = []
          this.arrR = []
          this.arrA = []

          arr1.forEach((item,index) => {
            if (item.name == "fonds_name") {
              this.arrF.push(item)
            }else if(item.name == "gdbm") {
              this.arrO.push(item)
            }else if(item.name == "nd") {
              this.arrY.push(item)
            }else if(item.name == "retention_period") {
              this.arrR.push(item)
            }else if(item.name == "archive_name") {
              this.arrA.push(item)
            }
          })
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style>
.CAspan >>> span {
  color: blue !important;
}
.highlight {
  color: red;
}
</style>
<style lang="less" scoped>
.body {
  width: 100%;
  background: white;
  overflow: auto;
  height: calc(100vh - 250px);
  .first {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // text-align: center;
    // &:first-child {
      // background: red;
    // }
  }
  // .car {
    // float: right;
    // margin-top: -17px;
    // background: #188d77;
  // }
  // .num {
    // float: left;
  // }
  .center {
    width: 70%;
    height: 800px;
    padding: 0 !important;
    margin-top: 0;
    .center-row {
      width: 100%;
      height: 120px;
      cursor: pointer;
      // margin-top: 30px;
      .header {
        width: 100%;
        height: auto;
        position: relative;
        /deep/ span {
          font-size: 21px;
        }
        .jj {
          cursor: pointer;
          position: absolute;
          right: 185px;
          color: #279ae2;
          top: 0;
          font-size: 18px;
        }
        .j {
          cursor: pointer;
          position: absolute;
          right: 130px;
          color: #279ae2;
          top: 0;
          font-size: 18px;
        }
        .jcar {
          cursor: pointer;
          position: absolute;
          color: #279ae2;
          right: 0;
          top: 0;
          font-size: 18px;
        }
      }
      .position li {
        float: left;
        margin: 5px 10px 5px 0;
      }
      .element {
        span {
          margin-right: 5px;
        }
      }
      .text {
        div {
          width: 800px;
          overflow: hidden;
          height: 19px;
          float: left;
          text-align: justify;
        }
      }
    }
  }
  .right {
    width: 20%;
    height: 550px;
    background: #FFEEE3;
    position: relative;
    >div {
      margin-left: 10px;
      margin-top: 30px;
    }
    .hide {
      cursor: pointer;
      position: absolute;
      color: #279ae2;
      right: 20px;
      top: 10px;
      font-size: 18px;
    }
    .rightContent {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      span {
        display: inline-block;
        width: 50%;
        margin-top: 15px;
      }
    }
  }
  .showRight {
    position: absolute;
    top: 80px;
    right: 60px;
    font-size: 18px;
    color: #279ae2;

  }
  .backTop {
    position: absolute;
    bottom: 150px;
    right: 50px;
    background: #FF5D56;
    width: 30px;
    height: 30px;
  }
}
.borrow_car {
  .el-form {
    /deep/ .el-form-item {
      width: 15%;
      margin-right: 0;
      margin-bottom: 0;
      // /deep/ .el-form-item__label {
      //   width: 82px !important;
      // }
      // &:nth-child(2) {
      //   /deep/ .el-form-item__label {
      //     width: 96px !important;
      //   }
      // }
    }
  }
}
/deep/ .el-form-item {
  width: 33% !important;
}
/deep/ .el-form-item&:first-child .el-form-item__label {
  width: 200px !important;
}
/deep/ .el-form-item&:nth-child(2) .el-form-item__label {
  width: 50px !important;
}
/deep/ .el-form-item .el-form-item__content {
  width: 40% !important;
}
.content_tree {
  padding: 0 10px 0 0;
  height: calc(100vh - 266px);
}
.borrowDetails .el-form .el-form-item {
  width: 100% !important;
}
/deep/ .borrowDetails .el-form .el-form-item .el-form-item__label {
  width: 200px !important;
}
.table input {
  border: none;
  outline: none;
}
.table {
  margin: auto;
}
.HH {
  text-align: center;
  margin: 20px 0;
}
.applyMessage p{
  text-align: right;
  margin-right: 20px;
  margin-top: 20px;
  margin: 20px 20px 30px 0;
}
</style>
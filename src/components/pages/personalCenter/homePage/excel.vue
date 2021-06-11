<template>
  <div id="table">

    <div class="tab">
      <el-radio-group v-model="cardActive">
        <el-radio-button v-for="(item,index) in card" :label="item" :key="index" @click="chooseTable(item)"></el-radio-button>
      </el-radio-group>
    </div>

     <el-table
      :data="tableData"
      style="width: 100%">

      <el-table-column
        v-for="(value,key,index) in tableData[2]"
        :key="index"
        :prop="key"
        :label="key">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  data () {
    return {
      tableData: [
        {
          '接口大类': '基础信息',
          '接口类别': '人防部门',
          '接口类别ID': 'O2_001'
        },
        {
          '接口大类': '基础信息',
          '接口类别': '人防部门',
          '接口类别ID': 'O2_001'
        }
      ],
      card: [],
      cardActive: '',
      workbook: {}

    }
  },
  watch: {
    cardActive (ov, nv) {
      this.getTable(ov)
    }
  },
  mounted () {
    // this.readWorkbookFromRemoteFile('‪C:\\Users\\gjy\\Desktop\\档案系统易用性需求清单-2021.4.13(1).xlsx')
    // this.readWorkbookFromRemoteFile('/static/o2.xlsx')
  },
  methods: {
    readWorkbookFromRemoteFile: function (url) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'arraybuffer'
      let _this = this
      xhr.onload = function (e) {
        if (xhr.status === 200) {
          var data = new Uint8Array(xhr.response)
          var workbook = XLSX.read(data, {type: 'array'})
          console.log(workbook)

          var sheetNames = workbook.SheetNames // 工作表名称集合
          _this.workbook = workbook
          _this.card = sheetNames
          _this.cardActive = sheetNames[0]
          _this.getTable(sheetNames[0])
        }
      }
      xhr.send()
    },
    getTable (sheetName) {
      console.log(111111111111)
      console.log(sheetName)
      var worksheet = this.workbook.Sheets[sheetName]
      this.tableData = XLSX.utils.sheet_to_json(worksheet)
      console.log(this.tableData)
    }
  }
}
</script>

<style lang="less" scoped>
#table {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  border: 1px solid #ebebeb;
  padding: 20px;
  width: 80%;
  margin: 20px auto;
  border-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
  border-radius: 10px;
  overflow: scroll;
  height: 100%;
  .tab {

    margin: 0 0 20px 0;
    display: flex;
    flex-direction: row;
  }


}
</style>

<style scoped>
.is-active{
  background-color:#409EFF
}
span{
  background-color:red
}

</style>
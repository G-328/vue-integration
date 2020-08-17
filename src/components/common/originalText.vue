<template>
  <div class="iframe_bar">
    <el-dialog
      :title="UpLoadtitle"
      :visible.sync="uploadFlag_"
      :modal-append-to-body="false"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-dialogDrag
    >
      <div>
        <el-upload
          style="display:inline-block;height:250px"
          :limit="5"
          class="upload-demo"
          ref="upload"
          accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .ofd, .JPG, .JPEG, .PBG, .GIF, .BMP, .PDF, .mp4, .mp3, .doc, .docx, .xls, .xlsx, .ppt, .txt"
          multiple
          action="http://101.132.38.152:8055/ams-collect-cloud/fileLibrary/insert"
          :http-request="uploadSectionFile"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" class="seach_" plain>选取文件</el-button>
          <!-- <el-button slot="trigger" size="small" plain style="color:white !important;">选取文件</el-button> -->
          <el-button
            style="margin-left: 10px;"
            size="small"
            icon="el-icon-upload2"
            class="seach_2"
            @click="submitUpload"
          >上传</el-button>
        </el-upload>
        <div class="updata-val" v-show="fileFlag">
          <span>文件类型</span>
          <el-select class="selectFileType" v-model="fileType" placeholder="请选择">
            <el-option
              v-for="item in fileOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>版本</span>
          <el-input v-model="Edition" class="selectFileType" placeholder></el-input>
          <span>原文密级</span>
          <el-select class="selectFileType" v-model="secretClass" placeholder="请选择">
            <el-option
              v-for="item in secretOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="Stripebottom dialog-footer">
        <el-button @click="uploadFlag_ = false">关 闭</el-button>
      </div>
    </el-dialog>
    <el-row>
      <el-col :span="14">
        <iframe id="center" :src="iformSrc"></iframe>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <div>
            <div style="textAlign:right">
              <el-button
                size="small"
                type="warning"
                class="defaultBtn btn_mar_bot"
                @click="addfn"
              >新增</el-button>
              <el-button
                size="small"
                type="warning"
                class="defaultBtn btn_mar_bot"
                @click="updateFn"
              >修改</el-button>
              <el-button
                size="small"
                type="warning"
                class="defaultBtn btn_mar_bot"
                @click="delete_"
              >删除</el-button>
            </div>
            <el-table
              :data="originalData"
              @row-click="rowClick"
              @selection-change="handleSelectionChange"
              border
              style="width: 100%"
              height="770"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="FILE_NAME" align="center" label="文件名" min-width="180"></el-table-column>
              <el-table-column prop="YWMJ" lalign="center" label="原文密级" min-width="180"></el-table-column>
              <el-table-column prop="FILE_VERSION" align="center" label="版本" min-width="180"></el-table-column>
              <el-table-column prop="FILE_TYPE" align="center" label="文件类型" min-width="180"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="修改"
      :visible.sync="undateDialog"
      width="40%"
      :modal-append-to-body="false"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-dialogDrag
    >
      <div>
        <span>文件类型</span>
          <el-select class="selectFileType" v-model="fileType" placeholder="请选择">
            <el-option
              v-for="item in fileOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>版本</span>
          <el-input v-model="Edition" class="selectFileType" placeholder></el-input>
          <span>原文密级</span>
          <el-select class="selectFileType" v-model="secretClass" placeholder="请选择">
            <el-option
              v-for="item in secretOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
      </div>

      <div slot="footer" class="Stripebottom dialog-footer">
        <el-button @click="undateDialog = false">关 闭</el-button>
        <el-button @click="undateSave">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { bathInsert, getHtml, deleteFile,update } from "../../api/fileCollect";
export default {
  props:['originalData','id','code_'],
  data() {
    return {
      iformSrc: "",
      uploadFlag_: false,
      treeid_: sessionStorage.getItem("treeId"),
      tableData: [],
      fileFlag: true,
      fileType: "正文",
      rowVal: [],
      secretClass: "秘密",
      Edition: "",
      undateDialog:false,
      coverFlag: false,
      status:'',
      secretOptions: [
        {
          value: "秘密",
          label: "秘密"
        },
        {
          value: "机密",
          label: "机密"
        },
        {
          value: "绝密",
          label: "绝密"
        }
      ],
      fileOptions: [
        {
          value: "正文",
          label: "正文"
        },
        {
          value: "副本",
          label: "副本"
        },
        {
          value: "底稿",
          label: "底稿"
        }
      ],
      UpLoadtitle: "上传原文"
    };
  },
  methods: {
    Onclick(item) {
      // console.log(item);
      this.iformSrc = item.ADDRESS;
    },
    addfn() {
      this.uploadFlag_ = true;
      this.fileType = '',
      this.secretClass = '',
      this.Edition = ''
      this.status = 0
    },
    updateFn(){
        if (this.rowVal.length != 1) {
        this.$message({
          title: "消息",
          message: "请选择一条数据进行操作",
          type: "error"
        });
        return;
      }
      this.undateDialog = true
      this.status = 1
      this.fileType = this.rowVal[0].FILE_TYPE,
      this.secretClass = this.rowVal[0].YWMJ,
      this.Edition = this.rowVal[0].FILE_VERSION
    },
    undateSave(){
      update({
        id : this.treeid_,
        fid : this.rowVal[0].ID,
        fileType : this.fileType,
        fileVersion : this.Edition,
        ywmj : this.secretClass
      }).then(res => {
        this.getTable()
        this.undateDialog = false
        this.$message({
          title: "消息",
          message: res.data,
          type: "success"
        });
      })
    },
    delete_() {
      if (this.rowVal.length != 1) {
        this.$message({
          title: "消息",
          message: "请选择一条数据进行操作",
          type: "error"
        });
        return;
      }
      deleteFile({
        id: this.treeid_,
        fid: this.rowVal[0].ID
      }).then(res => {
        this.getTable()
        this.$message({
          title: "消息",
          message: res.data,
          type: "success"
        });
      });
    },
    rowClick(row) {
      this.iformSrc = row.ADDRESS;
    },
    handleSelectionChange(row) {
      // console.log(row)
      this.rowVal = row;
    },
    uploadSectionFile(param) {
      this.fileData.append("file", param.file);
    },
    submitUpload(row) {
      var list
      this.status == 0 ? list = this.id : list = this.originalData[0].ARCHIVE_DIRECTORY_ID
      this.fileData = new FormData();
      this.$refs.upload.submit();
      this.uploadLogo = "1";
      this.fileData.append("id", this.treeid_);
      this.fileData.append("list", list);
      this.fileData.append("fileType", this.fileType);
      this.fileData.append("fileVersion", this.Edition);
      this.fileData.append("ywmj", this.secretClass);
      bathInsert(this.fileData).then(res => {
        // console.log(res);
        this.$message({
          title: "消息",
          message: res.data,
          type: "success"
        });
        this.getTable()
      });
    },
    getTable(){
      getHtml({
          id: this.treeid_,
          infoId: this.originalData[0].ARCHIVE_DIRECTORY_ID
        }).then(res => {
          this.originalData = res.data;
          this.uploadFlag_ = false;
        });
    }
  },
  mounted() {
    this.iformSrc = ''
  },
  watch:{
    originalData:{
      handler: function(newVal, oldVal) {
      !newVal && [this.iformSrc = this.originalData[0].ADDRESS]
      // console.log(this.iformSrc)
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style>
</style>
<style lang="less" scoped>
.iframe_bar {
  height: 800px;
  width: 100%;
  #center {
    width: 95%;
    height: 850px;
    float: left;
  }
  #left {
    width: 15%;
    height: 800px;
    float: left;
    border-right: 1px solid #000;
    margin-right: 2%;
    cursor: pointer;
    div {
      width: 100%;
      line-height: 30px;
      text-indent: 1em;
      font-weight: bold;
    }
  }
}
.updata-val {
  position: absolute;
  right: 12px;
  top: 74px;
  width: 430px;
  .selectFileType {
    width: 200px;
  }
  span {
    width: 200px;
    text-align: right;
    margin-right: 20px;
  }
}
.seach_2{
      z-index: 123123123;
    position: relative;
}
</style>
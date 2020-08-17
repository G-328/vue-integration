<template>
  <div id="nav_header">
    <div class="module">电子档案室</div>
    <el-menu
      :default-active="activeIndex1"
      class="el-menu-demo"
      mode="horizontal"
      background-color="transparent"
      text-color="#fff"
      active-text-color="yellow"
    >
      <el-menu-item
        :index="item.index"
        v-for="(item, index) in arr"
        :key="index"
        @click="go(item.url)"
      >
        {{ item.title }}
      </el-menu-item>
    </el-menu>
    <div class="user">
      <i class="el-icon-user-solid"></i>
      管理员
      <i
        class="el-icon-switch-button"
        style="margin:0 15px"
        @click="doLogout"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        {
          title: "档案收集",
          url: "/archiveCollection/filesCollection",
          index: "1"
        },
        {
          title: "档案管理",
          url: "/archivesAdministration",
          index: "8"
        },
        // {
        //   title: "档案分级",
        //   url: "/classificationMenu",
        //   index: "2"
        // },
        // { title: "分级审核", url: "/gradingCheck", index: "3" },
        // {
        //   title: "文件格式转换",
        //   url: "/FileFormatConversion",
        //   index: "4"
        // },
        {
          title: "系统配置",
          url: "/systemConfiguration",
          index: "5"
        },
        // { title: "审计日志", url: "/auditLog", index: "6" },
        { title: "保管", url: "/Safekeeping", index: "7" },
        {
          title: "档案利用",
          url: "/archivesUtilize/fileRetrieval",
          index: "9"
        },
        // { title: "流程管理", url: "/processManagement", index: "10" },
        { title: "档案统计", url: "/fileStatistics/tableStatistics", index: "11" },

      ],
      activeIndex1: "1"
    };
  },
  methods: {
    go(url) {
      this.$router.push({ path: url });
    },
    doLogout() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style scoped lang="less">
#nav_header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background:-webkit-linear-gradient(left, #184596, #188DD7) 0 0 ;
  padding: 0 20px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}
#nav_header div,
#nav_header ul,
#nav_header li,
#nav_header span {
  float: left;
  color: white;
  font-size: 18px;
  height: 100%;
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
}
#nav_header i {
  font-size: 22px;
  height: 100%;
}

#nav_header .module {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-right: 60px;
}
#nav_header .user {
  float: right;
}
</style>

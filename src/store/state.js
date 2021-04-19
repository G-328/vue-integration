export default {
  user: {},
  sidebar: {  // 侧边栏状态
    opened: sessionStorage.getItem("sidebarStatus") ? sessionStorage.getItem("sidebarStatus") : true
  },
  fixedHeader: sessionStorage.getItem("fixedHeader") ? sessionStorage.getItem("fixedHeader") : true,  // 是否固定头部
  navBar: sessionStorage.getItem("navBar") ? sessionStorage.getItem("navBar") : true,  // 是否启用导肮条
  navList: sessionStorage.getItem("navList") ? JSON.parse(sessionStorage.getItem("navList")) : [],
}
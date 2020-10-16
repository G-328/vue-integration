export default {
  SET_USER(state,user){  // 用户
    state.user = user
  },
  
  SET_SIDEBAR(state,data){  // 侧边栏状态
    state.sidebar.opened = !state.sidebar.opened
    sessionStorage.setItem("sidebarStatus", state.sidebar.opened)
  },

  SET_FIXEDHEADER(state,data){  // 头部是否固定
    state.fixedHeader = !state.fixedHeader
    sessionStorage.setItem("fixedHeader", state.fixedHeader)
  },

  SET_NAVBAR(state,data){  // 导航条
    state.navBar = !state.navBar
    sessionStorage.setItem("navBar", state.navBar)
  },
} 
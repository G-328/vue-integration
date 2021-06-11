import service from './index';

const APIcollection = {
    
  //登录
  login(params) {
    return service.post('/admin/check', params);
  },

   //判断是否登录
   islogin(params) {
    return service.post('/admin/islogin', params);
  },

  //菜单
  MainIndex(params) {
    return service.post('/main/index', params);
  },

  //保存修改密码
  editUserPwd(params) {
    return service.post('/sysUser/editUserPwd', params);
  },

  //所有检查项明细
  index(params) {
    return service.post('/kfSecDesc/index', params);
  },
  //跳转main
  oaCheck(params) {
    return service.get('/admin/oaCheck', params);
  },
}

export default APIcollection

import axios from "axios";
// import { DeployIp } from "./ip"
import { Loading, Message, MessageBox } from 'element-ui'
/**
 * @desc 请求环境地址配置
 * development 开发环境
 * production 生产环境
 */

switch (process.env.NODE_ENV) {
  case "development":
    axios.defaults.baseURL = "/dev";
    break;
  case "production":
    axios.defaults.baseURL = DeployIp;
    break;
  default:
    break;
}
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
/**
 * @desc jsonp格式转json格式
 * @param {String} str
 */

const service = {
  /**
   * @desc GET 请求
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   */
  //api_plus:'ams-configuration-cloud',
  //线上
  //微服务
  // api_plus:'/ams-configuration-cloud',//系统配置
  // // api_plus: "/ams-configuration-QyQ", //系统配置
  // api_plus_1: "/ams-report-cloud", //报表设置
  // api_plus_2: "/arms-manage", //鉴定销毁
  // api_plus_3: "/ams-manage-cloud1", //归档管理
  // api_plus_4: "/ams-system-cloud", //组织机构
  //微服务end
  //本地
  // api_plus_3:'ams-manage-cloud-wyw',
  // api_plus_5:'ams-configuration-cloud-wyw',
  // API_:'/ams-collect-cloud',

  //单体
  api_plus:'',//系统配置
  // // api_plus: "/ams-configuration-QyQ", //系统配置
  api_plus_1: "", //报表设置
  api_plus_2: "", //鉴定销毁
  api_plus_3: "", //归档管理
  api_plus_4: "", //组织机构

  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          if(!sessionStorage.getItem('intercept')){
            reject(err.data);
            if(err.response.status == '444'){
              Message.error({
                message: '身份验证过期，请重新登录'
              })
              sessionStorage.setItem("intercept", '1');
              setTimeout(()=>{
                sessionStorage.clear()
                location.reload() 
              },1000) 
            }
            if(err.response.status == '440'){
              Message.error({
                message: '您没有操作该功能的权限'
              })
            }
            if(err.response.status == '441'){
              Message.error({
                message: '您没有操作该数据的权限'
              })
            }
            }
        });
    });
  },
  /**
   * @desc POST 请求
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   */
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          if(!sessionStorage.getItem('intercept')){
            reject(err.data);
            if(err.response.status == '444'){
              Message.error({
                message: '身份验证过期，请重新登录'
              })
              sessionStorage.setItem("intercept", '1');
              setTimeout(()=>{
                sessionStorage.clear()
                location.reload() 
              },1000) 
            }
            if(err.response.status == '440'){
              Message.error({
                message: '您没有操作该功能的权限'
              })
            }
            if(err.response.status == '441'){
              Message.error({
                message: '您没有操作该数据的权限'
              })
            }
            }
        });
    });
  },
  /**
   * @desc POST 请求
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   * @param {responseType: 'arraybuffer'} 解析文件流
   */
  export_XLS(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params, { responseType: "arraybuffer" })//响应类型
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          if(!sessionStorage.getItem('intercept')){
            reject(err.data);
            if(err.response.status == '444'){
              Message.error({
                message: '身份验证过期，请重新登录'
              })
              sessionStorage.setItem("intercept", '1');
              setTimeout(()=>{
                sessionStorage.clear()
                location.reload() 
              },1000) 
            }
            if(err.response.status == '440'){
              Message.error({
                message: '您没有操作该功能的权限'
              })
            }
            if(err.response.status == '441'){
              Message.error({
                message: '您没有操作该数据的权限'
              })
            }
            }
          
        });
    });
  },
  /**
   * @desc 直接返回JSON，不需要转换的
   * @param {String} url 请求地址
   */
  getJson(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          resolve(eval(res.data));
        })
        .catch(err => {
          reject(err.data);
          if(err.response.status == '444'){
            Message.error({
              message: '身份验证过期，请重新登录'
            })
            setTimeout(()=>{
              sessionStorage.clear()
              location.reload() 
            },1000)
          }
          if(err.response.status == '440'){
            Message.error({
              message: '您没有操作该功能的权限'
            })
          }
          if(err.response.status == '441'){
            Message.error({
              message: '您没有操作该数据的权限'
            })
          }
          
        });
    });
  }
};

export default service;

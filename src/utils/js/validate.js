/**
 * 表单校验规则
 */

/* 是否手机号码或者固话*/
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;
  if (value == '' || value == undefined || value == null) {
    callback(new Error('请输入电话号码或者固话号码'));
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码或者固话号码'));
    } else {
      callback();
    }
  }
}
/* 是否固话*/
export function validateTelphone(rule, value,callback) {
  const reg =/0\d{2}-\d{7,8}/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的固话（格式：区号+号码,如010-1234567）'));
    } else {
      callback();
    }
  }
}
/* 是否手机号码*/
export function validatePhone(rule, value,callback) {
  const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码'));
    } else {
      callback();
    }
  }
}
/* 是否身份证号码*/
export function validateIdNo(rule, value,callback) {
  var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
  if(!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(value)){
    callback(new Error('请输入正确的身份证号'));
  }else if(!city[value.substr(0,2)]){
    callback(new Error('请输入正确的身份证号'));
  }else{
      //18位身份证需要验证最后一位校验位
      if(value.length == 18){
        value = value.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
          //校验位
          var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++)
          {
              ai = value[i];
              wi = factor[i];
              sum += ai * wi;
          }
          if(parity[sum % 11] != value[17].toUpperCase()){
            callback(new Error('请输入正确的身份证号'));
          }
      }
  }
  return callback();
}
// 验证是否整数
export function isInteger(rule, value, callback) {
  if (!value) {
    callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    }
  }, 0);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
/* 是否邮箱*/
export function validateEMail(rule, value,callback) {
  const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('请输入正确的邮箱地址！'));
    } else {
      callback();
    }
  }
}

//银行卡卡号校验方法
export function formatBankNo(rule, bankno, callback) {
  bankno = bankno.replace(/\s/g,'');
  var num = /^\d*$/;//全数字
  var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
  if(bankno == ""||bankno.length < 16 || bankno.length > 19){
    callback(new Error('请输入正确的银行卡号!'))
  }else{
      if(!num.test(bankno)) {
        callback(new Error('请输入正确的银行卡号!'))
      }else{
        if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
          callback(new Error('请输入正确的银行卡号!'))
        }else{
          callback();
        }
      }
  }
  // if(bankno == "") {
  //   callback(new Error('请输入正确的银行卡号!'))
  // }else if(bankno.length < 16 || bankno.length > 19) {
  //   callback(new Error('请输入正确的银行卡号!'))
  // }
  // var num = /^\d*$/;//全数字
  // if(!num.exec(bankno)) {
  //   callback(new Error('请输入正确的银行卡号!'))
  // }
  // //开头6位
  // var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
  // if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
  //   callback(new Error('请输入正确的银行卡号!'))
  // }
}

// 输入密码不能少于4位
export function typePasswordLength (rule, value, callback) {
  if (value!== null && value!=='') {
    setTimeout(() => {
      if(value.length <4){
        callback(new Error("密码不得小于四位"));
      }else{
        callback();
      }
    }, 100);
  }
}

// 姓名登录名不能包含特殊字符
export function typeSpecialCharacter (rule, value, callback) {
  const reg =/^[^`!@#$%^&*.<>]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('输入不能包含特殊字符'));
    } else {
      callback();
    }
  }
}

/* 端口的校验*/
export function validatePort(rule, value,callback) {
  const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if (!(/^[1-9]\d*$/.test(value) && 1 <= 1 * value && 1 * value <= 65535)) {
      callback(new Error('请输入正确的端口号'));
    } else {
      callback();
    }
  }
}

/* ip的校验*/
export function validateIp(rule, value,callback) {
  const reg =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的ip'));
    } else {
      callback();
    }
  }
}




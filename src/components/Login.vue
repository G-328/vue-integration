<template>
  <div class="wrap">
    <div class="content">
      <div class="title">
        <p>俏皮小可爱</p>
      </div>
      <div class="main">
        <!--  -->
        <div class="UorP" v-show="isShowUserNameOrPhone">
          <div>
            <el-input
              placeholder="用户名"
              v-model="userName">
            </el-input>
          </div>
          <div>
            <el-input
              placeholder="密码"
              show-password
              v-model="password">
            </el-input>
          </div>
        </div>
        <!--  -->
        <div class="UorP" v-show="!isShowUserNameOrPhone">
          <div>
            <el-input
              placeholder="手机号"
              v-model="phone">
            </el-input>
          </div>
          <div class="code">
            <el-input
              placeholder="验证码"
              v-model="code">
            </el-input>
            <el-button
              @click="$_disabled"
              :disabled="isShowDisabled"
              class="codeBtn"
            >{{content}}</el-button>
          </div>
        </div>
        <!--  -->
        <div class="switch">
          <div>
            <span @click="$_switch(1)">用户名登录</span>&nbsp;&nbsp;
            <span @click="$_switch(2)">手机号登录</span>
          </div>
          <span @click="$_enroll">注册</span>
        </div>
      </div>
      <div class="login">
        <el-button @click="$_login">登&nbsp;录</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      userName: "",
      password: "",
      phone: "",
      code: "",
      content: "获取验证码",
      isShowUserNameOrPhone: true,
      isShowDisabled: false,
      number: 60,
    }
  },
  methods: {
    $_switch(type) {
      if (type === 1) {
        this.isShowUserNameOrPhone = true
        this.phone = ""
        this.code = ""
      }else {
        this.isShowUserNameOrPhone = false
        this.userName = ""
        this.password = ""
      }
    },
    $_enroll() {},
    $_disabled() {
      this.isShowDisabled = true
      let interval = setInterval(() => {
        if (this.number === 0) {
          this.number = 60
          this.content = "获取验证码"
          this.isShowDisabled = false
          clearInterval(interval)
        }else {
          this.content = this.number-- + "秒"
        }
      }, 1000);
    },
    $_login() {
            this.$router.push("/Home")

      // this.$router.push("/Home")
      // 
      var self = this;
     /*  if (Date.now() - this.onpresscTime > 2000) {
        this.onpresscTime = Date.now();
        this.num += 1;
        this.$axios.post('/admin/check', {
          USERNAME: this.userName,
          PASSWORD: this.password,
        // })
        // APIcollection.login({
        //   USERNAME: this.userName,
        //   PASSWORD: this.password,
        }).then((res) => {
          if (res.code) {
            sessionStorage.setItem("user", this.userName);
            sessionStorage.setItem("JSBS", res.data.JSBS);
            sessionStorage.setItem("xx", res.data.MyMessage);
            sessionStorage.setItem("userName", JSON.stringify(res.data.User));
            sessionStorage.setItem("token", res.data.token)
            this.$router.push("/Home")
            // if (res.data.User.archivesCadre == "PT") {
            // if (res.data.JSBS == "PT" || res.data.JSBS == "1") {
            //   console.log("archivesCadre")
            //   this.$router.push({ path: "/archivesUtilize/fileRetrieval" });
            // } else {
            //   this.$router.push({ path: "/personalCenter/UserCenter" });
            // }
          } else {
            if (res.data == 1) {
              this.$message({
                title: "消息",
                message: res.msg,
                type: "warning",
              });
              this.$store.commit("SET_USERNAME", this.userName);
              setTimeout(() => {
                var a = true;
                self.$store.commit("CHANGE_PASSWORD", a);
                sessionStorage.setItem("user", this.userName);
              }, 500);
              return;
            }
            if (res.msg == "computererror") {
              this.$message({
                title: "消息",
                message: "您的计算机没有访问权限",
                type: "error",
              });
            } else {
              this.$message({
                title: "消息",
                message: res.msg,
                type: "error",
              });
            }
          }
        });
      } */
    },
    $_keyCode(e) {
      console.log("qweqwe")
      if (e.keyCode === 13) {
        console.log("_keyCode")
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.$_keyCode)
    // 利用hook监听事件的方式移除事件绑定
    this.$once("hook:beforeDestroy", () => {
      console.log("beforeDestroy")
      window.removeEventListener("keydown", this.$_keyCode)
    })
  },
}
</script>

<style lang='less' scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: url("~@img/login.jpg") no-repeat left top /100% 100%;
  display:flex;
  justify-content: flex-end;
  align-items: center;
  .content {
    width: 20%;
    height: 40%;
    margin-right: 200px;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .main {
      .UorP {
        >div {
          width: 100%;
          height: 50px;
        }
        >div:last-child {
          margin-top: 50px;
        }
        .code {
          position: relative;
        }
        /deep/.codeBtn {
          background-color: transparent !important;
          border-color: transparent !important;
          height: 100%;
          position: absolute;
          right: 0;
          span {
            color: #000000 !important;
          }
        }
      }
      .switch {
        display: flex;
        justify-content: space-between;
        margin-top: 3px;
        span {
          color: #ffffff;
          cursor: pointer;
        }
        span:hover {
          color: #21B2B8;
        }
      }
    }
    /deep/.login {
      .el-button {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 38px;
          line-height: 50px;
        }
      }
    }
  }
}
</style>
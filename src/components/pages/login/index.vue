<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="login-title">
        <p class="title">Login Form</p>
      </div>

      <el-form-item prop="userName">
        <span class="login-icon">
          <div>
            <i class="icon el-icon-user-solid"></i>
          </div>
        </span>
        <el-input
          type="text"
          v-model="loginForm.userName"
          placeholder="userName"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="login-icon">
          <div>
            <i class="icon el-icon-lock"></i>
          </div>
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="password"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd login-icon" @click="showPad">
          <div>
            <i
              class="icon"
              :class="passwordType === 'password' ? 'el-icon-finished' : 'el-icon-view'"
            ></i>
          </div>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        class="login-button"
        @click="handleLogin"
      >Login</el-button>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import APIcollection from "@/api/login";

export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      // const userName = ["admin", "gjy"]
      // if (userName.indexOf(value.trim()) === -1) {
      if (false) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: "admin",
        password: "123",
        phone: "",
        code: "",
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: "password",
      onpresscTime: 0,
    }
  },
  methods: {
    showPad() {
      if (this.passwordType === "password") {
        this.passwordType = "text"
      }else {
        this.passwordType = "password"
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.commit('SET_USER', {userName: this.loginForm.userName})
          sessionStorage.setItem("user", {userName: this.loginForm.userName})
          this.$router.push({path: "/home"})
        }else {
          return false
        }
      })
    },
    handleLogin1() {
      this.$router.push("/Home")
      return
      var self = this;
      if (Date.now() - this.onpresscTime > 2000) {
        console.log("-=-==")
        this.onpresscTime = Date.now();
        this.num += 1;
        // this.$axios.post('/admin/check', {
          // USERNAME: this.userName,
          // PASSWORD: this.password,
        // })
        APIcollection.login({
          USERNAME: this.loginForm.userName,
          PASSWORD: this.loginForm.password,
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
      }
    },
  },
  mounted() {
    console.log("login")
  },
}
</script>

<style lang='less' scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: url("~@img/login.jpg") no-repeat left top /100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 530px;

    .login-title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      .title {
        font-size: 24px;
        color: #ffffff;
        text-align: center;
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);

      .login-icon {
        width: 30px;
        height: 47px;
        vertical-align: middle;
        >div {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            color: #ffffff;
          }
        }
      }

      /deep/.el-input {
        width: calc(100% - 30px);
        height: 47px;
        .el-input__inner {
          height: 47px;
          border: 0px;
          border-radius: 0px;
          background: transparent;
        }
      }

      .show-pwd {
        position: absolute;
        right: 0;
      }
    }

    .login-button {
      width: 100%;
      font-size: 24px;
    }
  }
}
</style>
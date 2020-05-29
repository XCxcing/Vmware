<template>
  <div class="login">
    <el-form ref="adminForm" :model="adminForm" class="container" :rules="rules">
      <h3 style="font-size:20px;line-height:60px;font-weight:700;">资源管理系统登录</h3>
      <el-form-item prop="phoneNumber">
        <el-input v-model="adminForm.userName" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="adminForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="isLoading" style="width: 60%" @click="login()" type="primary">登陆</el-button>
        <el-button :loading="isLoading" style="width: 36%" @click="$router.push('/reg')" type="success">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      adminForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      // this.$router.push("/admin");
      this.$axios({
        method: "get",
        url: this.baseUrl + "/user?username="+this.adminForm.userName+"&password="+this.adminForm.password
      }).then(res=>{
        // console.log(res);
        // console.log(res.data.data);
        if (res.data.status == 200) {
            sessionStorage.type = res.data.data.type;
            sessionStorage.userid = res.data.data.id;
            sessionStorage.name = res.data.data.username;
            sessionStorage.password = this.adminForm.password;
            // location.reload();
            this.$router.push("/admin");
          } else {
            this.$message({
              showClose: true,
              message: "登录账号或密码有误",
              type: "error"
            });
          }
      })
      .catch(err => {
          this.$message({
            showClose: true,
            message: "登录账号或密码有误",
            type: "error"
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  // background-image: url("../assets/imgs/timg.jpg");
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590689569342&di=6a054023448e9dec65aabfe25e41b096&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F50da81cb39dbb6fd823dd4c70e24ab18962b37e8.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  border: 1px solid #eaeaea;
  color:#66b1ff;
  margin: 200px 0 200px 800px;
  background-color: rgba(0,0,0,0.4);
  width: 350px;
  padding: 20px 30px;
  h3 {
    text-align: center;
  }
}
</style>
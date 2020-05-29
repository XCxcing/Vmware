<template>
  <div class="changepass">
    <br><br><br><br>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h3 style="font-size:20px;line-height:60px;font-weight:700;">用户修改密码</h3>
      <el-form-item label="请输入旧密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="输入确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ChangePass",
  data() {
    var validateoldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        if (
          sessionStorage.password &&
          sessionStorage.password == this.ruleForm.oldPass
        ) {
          callback();
        } else {
          callback(new Error("旧密码输入有误"));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [{ validator: validateoldPass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method: "put",
            url:
              this.baseUrl + "/user/update",
            data: {
              id: sessionStorage.userid,
              password: this.ruleForm.pass
            }
          })
            .then(res => {
              // console.log(res);
              if (res.data.status == 200) {
                this.$router.push("/login");
                this.$message({
                  showClose: true,
                  message: "修改密码成功，请重新登录",
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "修改密码失败",
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "修改密码失败",
                type: "error"
              });
            });
        } else {
          this.$message({
            showClose: true,
            message: "请按规范提示，输入符合规范的密码",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
.changepass {
  width: 50%;
  margin: 0 auto;
}
</style>

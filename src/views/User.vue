<template>
  <div class="carlist">
    <h3 style="font-size:20px;line-height:80px;font-weight:700;">查看人员信息</h3>
    <div class="top">
      <el-button
        type="primary"
        @click="showAdd=true;phoneNumber='';userName='';password='';selectValue=''"
      >添加人员</el-button>
      <el-dialog title="用户信息" :visible.sync="showAdd" style="width:1000px;margin:0 auto;">
        <div class="block">
          <span style="display:inline-block;width:150px;text-align:center;">姓名</span>
          <el-input
            placeholder="请输入姓名"
            style="display:inline-block;width:300px;"
            v-model="userName"
            clearable
          ></el-input>
        </div>
        <div class="block">
          <span style="display:inline-block;width:150px;text-align:center;">密码</span>
          <el-input
            placeholder="请输入密码"
            style="display:inline-block;width:300px;"
            v-model="password"
            clearable
          ></el-input>
        </div>
        <div class="block">
          <span style="display:inline-block;width:150px;text-align:center;">身份</span>
          <el-select v-model="identity" placeholder="请选择身份">
            <el-option label="普通用户" value="普通用户"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAdd = false">取 消</el-button>
          <el-button type="primary" @click="addInfo();showAdd = false;">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="tableData" stripe border style="width: 1221px;margin:0 auto;" align="center">
      <!-- <el-table :data="tableData" stripe border style="width: 50%;margin:0 auto;" align="center" @row-click="getDetails"> -->
      <el-table-column prop="id" label="人员id" width="120" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120" align="center"></el-table-column>
      <el-table-column prop="password" label="密码" width="140" align="center"></el-table-column>
      <el-table-column prop="type" label="身份" width="140" align="center"></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200"
        align="center"
        :formatter="createTime"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="200"
        align="center"
        :formatter="updateTime"
      ></el-table-column>
      <el-table-column label="修改" width="120" align="center">
        <template slot-scope="scope">
          <!-- <div v-if="scope.row.addstatus == true"> -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEdit=true;userName=scope.row.username;identity=scope.row.type;password=scope.row.password;userId=scope.row.id"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="userId=scope.row.id;deleteInfo()"
          ></el-button>
          <el-dialog title="成员信息" :visible.sync="showEdit" style="width:1000px;margin:0 auto;">
            <div class="block">
              <span style="display:inline-block;width:150px;text-align:center;">用户名</span>
              <el-input
                placeholder="请输入用户名"
                style="display:inline-block;width:300px;"
                v-model="userName"
                clearable
              ></el-input>
            </div>
            <div class="block">
              <span style="display:inline-block;width:150px;text-align:center;">密码</span>
              <el-input
                placeholder="请输入密码"
                style="display:inline-block;width:300px;"
                v-model="password"
                clearable
              ></el-input>
            </div>
            <div class="block">
              <span style="display:inline-block;width:150px;text-align:center;">身份</span>
              <el-select v-model="identity" placeholder="请选择身份">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="管理员" value="管理员"></el-option>
              </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showEdit = false;">取 消</el-button>
              <el-button type="primary" @click="editInfo();showEdit = false;">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      tableData: [],
      formLabelWidth: "1000px",
      userId: 0,
      userName: "",
      showEdit: false,
      showAdd: false,
      phoneNumber: "",
      password: "",
      identity: "",
      registTime: new Date()
    };
  },
  methods: {
    addInfo() {
      console.log(this.password,this.userName,this.identity)
      this.$axios({
        method: "post",
        url: this.baseUrl + "/user/add",
        data: {
          "password": this.password,
          "type": this.identity,
          "username": this.userName
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.status == 200) {
            this.getListInfo();
            this.$message({
              showClose: true,
              message: "用户添加成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "用户添加失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "用户添加失败",
            type: "error"
          });
        });
    },
    editInfo() {
      // console.log(this.userId,this.userName,this.password,this.identity)
      this.$axios({
        method: "put",
        url: this.baseUrl + "/user/update",
        data: {
          id: this.userId,
          username: this.userName,
          password: this.password,
          type: this.identity
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.status == 200) {
            this.getListInfo();
            this.$message({
              showClose: true,
              message: "人员信息修改成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "人员信息修改失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "人员信息修改失败",
            type: "error"
          });
        });
    },
    deleteInfo() {
      console.log(this.userId);
      this.$confirm("此操作将永久删除此人员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "delete",
            url: this.baseUrl + "/user?id="+this.userId
          })
            .then(res => {
              if (res.data.status == 200) {
                this.getListInfo();
                this.$message({
                  showClose: true,
                  message: "人员删除成功",
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "人员删除失败",
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "人员删除失败",
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getListInfo() {
      this.$axios({
        method: "get",
        url: this.baseUrl + "/user/find"
      })
        .then(res => {
          // console.log(res);
          if (res.data.status == 200) {
            // 人员信息的最后一条是管理员信息，删除后显示
            this.tableData = res.data.data.users;
            // this.$message({
            //   showClose: true,
            //   message: "成功",
            //   type: "success"
            // });
          } else {
            this.$message({
              showClose: true,
              message: "人员获取失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "人员获取失败",
            type: "error"
          });
        });
    },
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    // startWorkTime(val) {
    //   let date = new Date(val.startWorkTime);
    //   return this.formatDateTime(date);
    // },
    createTime(val) {
      let date = new Date(val.createTime);
      return this.formatDateTime(date);
    },
    updateTime(val) {
      // return this.timestampToTime(val.updateTime);
      let date = new Date(val.updateTime);
      return this.formatDateTime(date);
    }
  },
  created() {
    this.getListInfo();
  }
};
</script>

<style scoped lang="scss">
.carlist {
  width: 100%;
  margin: 0 auto;
  //   margin-top: 40px;
  .top {
    text-align: left;
    margin: 0 40px 40px;
  }
  .block {
    margin: 40px auto;
    text-align: left;
  }
}
</style>
idnumber
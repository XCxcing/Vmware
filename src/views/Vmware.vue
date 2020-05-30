<template>
  <div class="vmware">
    <h3 style="font-size:20px;line-height:80px;font-weight:700;">查看虚拟机信息</h3>
    <div class="top">
      <el-button
        type="primary"
        round
        v-if="type=='管理员'"
        @click="showAdd=true;vmwareName='';cpuNumber='';vmwareMemory=''"
      >添加虚拟机</el-button>
      <el-dialog title="虚拟机信息" :visible.sync="showAdd" style="width:1000px;margin:0 auto;">
        <div class="block">
          <span style="display:inline-block;width:150px;text-align:center;">虚拟机名称</span>
          <el-input
            placeholder="请输入虚拟机名称"
            style="display:inline-block;width:300px;"
            v-model="vmwareName"
            clearable
          ></el-input>
        </div>
        <div class="block">
          <span style="display:inline-block;width:150px;text-align:center;">CPU核数</span>
          <!-- <el-input
            placeholder="请输入CPU核数"
            style="display:inline-block;width:300px;"
            v-model="cpuNumber"
            clearable
          ></el-input>-->
          <el-select
            v-model="cpuNumber"
            placeholder="请选择CPU核数"
            style="display:inline-block;width:300px;"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </div>
        <div class="block">
          <span style="display:inline-block;width:150px;text-align:center;">分配内存（GiB）</span>
          <el-input
            placeholder="请输入分配内存"
            style="display:inline-block;width:300px;"
            v-model="vmwareMemory"
            clearable
          ></el-input>
        </div>
        <div
          style="color:red;margin-left:80px;"
        >总内存为 7.6 GiB，当前已使用 {{usedMemory}} GiB，剩余 {{(7.6-usedMemory).toFixed(2)}} GiB</div>
        <!-- <div class="block">
          <span style="display:inline-block;width:150px;text-align:center;">创建者</span>
          <el-select
            v-model="selectUser"
            placeholder="请选择创建者"
            style="display:inline-block;width:300px;"
          >
            <el-option
              v-for="item in UserOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAdd = false">取 消</el-button>
          <el-button type="primary" @click="addInfo();showAdd = false;">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 搜索虚拟机信息 -->
      <el-input
        placeholder="请输入虚拟机名称"
        style="display:inline-block;width:300px;margin:0 20px;"
        prefix-icon="el-icon-search"
        v-model="searchInfo"
        clearable
      ></el-input>
      <el-button icon="el-icon-search" type="primary" circle @click="searchVmware()"></el-button>
    </div>
    <!-- 1182 -->
    <el-table :data="tableData" stripe border :style="type=='管理员'?'width: 642px;margin:0 auto;':'width: 522px;margin:0 auto;'" align="center">
      <el-table-column prop="id" label="虚拟机id" width="120" align="center"></el-table-column>
      <el-table-column prop="name" label="虚拟机名称" width="120" align="center"></el-table-column>
      <el-table-column prop="cpu" label="cpu核数" width="140" align="center"></el-table-column>
      <el-table-column prop="memory" label="内存空间" width="140" align="center"></el-table-column>
      <!-- <el-table-column
        prop="createUser"
        label="创建者"
        width="140"
        align="center"
        :formatter="userIdName"
      ></el-table-column>-->
      <!-- <el-table-column
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
      ></el-table-column>-->
      <el-table-column label="修改" width="120" align="center" v-if="type=='管理员'">
        <template slot-scope="scope">
          <!-- <div v-if="scope.row.addstatus == true"> -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEdit=true;vmwareName=scope.row.name;cpuNumber=scope.row.cpu;vmwareMemory=scope.row.memory.split(' ')[0];vmwarerId=scope.row.id"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="vmwarerId=scope.row.id;deleteInfo()"
          ></el-button>
          <el-dialog title="成员信息" :visible.sync="showEdit" style="width:1000px;margin:0 auto;">
            <div class="block">
              <span style="display:inline-block;width:150px;text-align:center;">虚拟机名称</span>
              <el-input
                placeholder="请输入虚拟机名称"
                style="display:inline-block;width:300px;"
                v-model="vmwareName"
                clearable
              ></el-input>
            </div>
            <div class="block">
              <span style="display:inline-block;width:150px;text-align:center;">CPU核数</span>
              <el-select
                v-model="cpuNumber"
                placeholder="请选择CPU核数"
                style="display:inline-block;width:300px;"
              >
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </div>
            <div class="block">
              <span style="display:inline-block;width:150px;text-align:center;">分配内存（GiB）</span>
              <el-input
                placeholder="请输入分配内存"
                style="display:inline-block;width:300px;"
                v-model="vmwareMemory"
                clearable
              ></el-input>
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
  name: "Vmware",
  data() {
    return {
      tableData: [
        // "id": 1,
        // "name": "vmware01",
        // "cpu": 2,
        // "memory": "1 GiB",
        // "disk": "string",
        // "createTime": "2020-05-30T00:56:19.000+00:00",
        // "updateTime": "2020-05-30T00:56:19.000+00:00",
        // "createUser": 1
      ],
      showEdit: false,
      showAdd: false,
      formLabelWidth: "1000px",
      vmwarerId: 0,
      vmwareName: "",
      cpuNumber: "",
      vmwareMemory: "",
      userList: [],
      searchInfo: "",
      usedMemory: 0,
      type: sessionStorage.type
      // UserOptions: []
    };
  },
  methods: {
    addInfo() {
      console.log(this.password, this.userName, this.identity);
      this.$axios({
        method: "post",
        url: this.baseUrl + "/vmware/add",
        data: {
          cpu: this.cpuNumber,
          createUser: Number(sessionStorage.userid),
          // disk: "string",
          memory: this.vmwareMemory + " GiB",
          name: this.vmwareName
        }
      }).then(res => {
        // console.log(res);
        if (res.data.status == 200) {
          this.getListInfo();
          this.$message({
            showClose: true,
            message: "虚拟机添加成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "虚拟机添加失败",
            type: "error"
          });
        }
      });
    },
    editInfo() {
      this.$axios({
        method: "put",
        url: this.baseUrl + "/vmware/update",
        data: {
          cpu: this.cpuNumber,
          // createUser: 0,
          // disk: "string",
          id: this.vmwarerId,
          memory: this.vmwareMemory + " GiB",
          name: this.vmwareName
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.status == 200) {
            this.getListInfo();
            this.$message({
              showClose: true,
              message: "虚拟机信息修改成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "虚拟机信息修改失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "虚拟机信息修改失败",
            type: "error"
          });
        });
    },
    deleteInfo() {
      console.log(this.userId);
      this.$confirm("此操作将永久删除此虚拟机信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "delete",
            url: this.baseUrl + "/vmware?id=" + this.vmwarerId
          })
            .then(res => {
              if (res.data.status == 200) {
                this.getListInfo();
                this.$message({
                  showClose: true,
                  message: "虚拟机信息删除成功",
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "虚拟机信息删除失败",
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "虚拟机信息删除失败",
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
        method: "post",
        url: this.baseUrl + "/vmware",
        data: {
          pageNumber: 1,
          pageSize: 100,
          name: this.searchInfo
          // endTime: "2020-05-29T16:26:47.037Z",
          // startTime: "2020-05-29T16:26:47.037Z"
        }
      }).then(res => {
        // console.log(res);
        if (res.data.status == 200) {
          let temarr = res.data.data.systemVmwares;
          temarr.forEach(el => {
            this.usedMemory += Number(el.memory.split(" ")[0]);
          });

          this.tableData = temarr;
          // this.$message({
          //   showClose: true,
          //   message: "成功",
          //   type: "success"
          // });
        } else {
          this.$message({
            showClose: true,
            message: "虚拟机信息获取失败",
            type: "error"
          });
        }
      });
    },
    getUserListInfo() {
      this.$axios({
        method: "get",
        url: this.baseUrl + "/user/find"
      }).then(res => {
        // console.log(res);
        if (res.data.status == 200) {
          // 人员信息的最后一条是管理员信息，删除后显示
          this.userList = res.data.data.users;
          // let userList = res.data.data.users;
          // let userAll = [];
          // userList.forEach(el => {
          //   let item = {
          //     value: "",
          //     label: ""
          //   };
          //   item.value = el.id;
          //   item.label = el.username;
          //   userAll.push(item);
          // });
          // this.UserOptions = userAll;
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
    searchVmware() {
      this.getListInfo();
    },
    userIdName(val) {
      console.log(val);
      console.log(this.userList);
      let useridname = "";
      this.userList.forEach(el => {
        if (el.id == val.createUser) {
          // console.log(el.imgUrl)
          useridname = el.username;
        }
      });
      return useridname;
    },
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
    this.getUserListInfo();
    this.getListInfo();
  }
};
</script>

<style scoped lang="scss">
.vmware {
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
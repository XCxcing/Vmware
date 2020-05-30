<template>
  <div class="utilization">
    <h3 style="font-size:20px;line-height:80px;font-weight:700;">查看资源使用率</h3>
    <div class="top">
      <el-button type="primary" round @click="refreash()">刷新数据</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 801px;margin:0 auto;" align="center">
      <el-table-column prop="type" label="类型" width="200" align="center"></el-table-column>
      <el-table-column prop="used" label="已使用" width="200" align="center"></el-table-column>
      <el-table-column prop="total" label="总数" width="200" align="center"></el-table-column>
      <el-table-column prop="percent" label="使用率（百分比）" width="200" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Utilization",
  data() {
    return {
      tableData: [],
      formLabelWidth: "1000px"
    };
  },
  methods: {
    getListInfo() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/vmware",
        data: {
          pageNumber: 1,
          pageSize: 100
        }
      }).then(res => {
        // console.log(res);
        if (res.data.status == 200) {
          let temarr = [
            {
              type: "内存",
              used: "",
              total: "8160437862",
              percent: ""
            },
            {
              type: "CPU",
              used: "",
              total: "2",
              percent: ""
            },
            {
              type: "已分配的主存储",
              used: "",
              total: "909832093696",
              percent: ""
            },
            {
              type: "管理类IP地址",
              used: "",
              total: "20",
              percent: ""
            },
            {
              type: "共享网络IP",
              used: "",
              total: "40",
              percent: ""
            },
            {
              type: "本地存储",
              used: "",
              total: "402070761472",
              percent: ""
            },
            {
              type: "辅助存储",
              used: "",
              total: "45491604848",
              percent: ""
            },
            {
              type: "存储",
              used: "",
              total: "856986808320",
              percent: ""
            }
          ];
          let systemData = res.data.data.systemVmwares;
          let cpunumber = 1;
          temarr[1].percent = 50.00;
          let memorynumber = 0;
          if (systemData.length == 0) {
            cpunumber = 0;
            temarr[1].percent = 0;
          } else {
            systemData.forEach(el => {
              let a = el.memory.split(" ")[0];
              memorynumber += Number(a);
              if (el.cpu == 2) {
                cpunumber = 2;
                temarr[1].percent = 100.00;
              }
            });
            temarr[0].used = Math.ceil(memorynumber * 1024 * 1024 * 1024);
            temarr[0].percent = (
              (temarr[0].used / temarr[0].total) *
              100
            ).toFixed(2);
            temarr[1].used = cpunumber;
            temarr[2].percent = this.random(16.52,46.52);
            temarr[2].used = Math.ceil(temarr[2].total*temarr[2].percent);
            temarr[3].used = Math.ceil(this.random(0,temarr[3].total));
            temarr[3].percent = (temarr[3].used/temarr[3].total*100).toFixed(2);
            temarr[4].used = Math.ceil(this.random(0,temarr[4].total));
            temarr[4].percent = (temarr[4].used/temarr[4].total*100).toFixed(2);
            temarr[5].percent = this.random(0.2,30.2);
            temarr[5].used = Math.ceil(temarr[5].total*temarr[5].percent);
            temarr[6].percent = this.random(16.41,46.41);
            temarr[6].used = Math.ceil(temarr[6].total*temarr[6].percent);
            temarr[7].percent = this.random(12.27,42.27);
            temarr[7].used = Math.ceil(temarr[7].total*temarr[7].percent);
          }

          this.tableData = temarr;
        } else {
          // this.$message({
          //   showClose: true,
          //   message: "虚拟机信息获取失败",
          //   type: "error"
          // });
        }
      });
    },
    random(min, max) {
      return (Math.random() * (max - min) + min).toFixed(2);
    },
    refreash() {
      this.getListInfo();
    }
  },
  created() {
    this.getListInfo();
  }
};
</script>

<style scoped lang="scss">
.utilization {
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
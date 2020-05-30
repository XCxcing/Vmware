<template>
  <div class="phyware">
    <h3 style="font-size:20px;line-height:80px;font-weight:700;">查看物理机信息</h3>
    <!-- <div class="top">
      <el-button type="primary" round @click="refreash()">刷新数据</el-button>
    </div>-->
    <el-table :data="tableData" stripe border style="width: 601px;margin:0 auto;" align="center">
      <!-- <el-table :data="tableData" stripe border style="width: 50%;margin:0 auto;" align="center" @row-click="getDetails"> -->
      <el-table-column prop="key" label="类型" width="200" align="center"></el-table-column>
      <el-table-column prop="value" label="内容" width="400" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "PhyWare",
  data() {
    return {
      tableData: [
        // "id": 1,
        // "manufacturer": "Smdbmds",
        // "model": "Smdbmds",
        // "serialnumber": "Smdbmds",
        // "firmwareManufacturer": "SeaBIOS",
        // "firmwareName": "unknown",
        // "firemwareDescription": "dmi:bvnSeaBIOS:bvrseabios-1.9.1-qemu-project.org:bd04/01/2014:svnSmdbmds:pnKVM:pvr3.0:cvnSmdbmds:ct1:cvr3.0:",
        // "firmwareVersion": "dmi:bvnSeaBIOS:bvrseabios-1.9.1-qemu-project.org:bd04/01/2014:svnSmdbmds:pnKVM:pvr3.0:cvnSmdbmds:ct1:cvr3.0:",
        // "firmwareReleaseDate": "release date: 04/01/2014",
        // "baseboardManufacturer": "unknown",
        // "baseboardModel": "unknown",
        // "baseboardVersion": "unknown",
        // "baseboardSerialnumber": "",
        // "physicalProcessorCount": 2,
        // "logicalProcessorCount": 2,
        // "identifier": "Intel64 Family 6 Model 94 Stepping 3",
        // "processorId": "0F81FBFF005006E3",
        // "userMemory": "1.7 GiB",
        // "totalMemory": "7.6 GiB",
        // "swapUsed": "0 bytes",
        // "swapTotal": "0 bytes",
        // "cpuNowInfo": "User: 10.6% Nice: 0.0% System: 4.0% Idle: 84.3% IOwait: 0.0% IRQ: 0.0% SoftIRQ: 1.0% Steal: 0.0%",
        // "countingTicks": "PID  %CPU %MEM       VSZ       RSS Name   381  11.8 12.2  13.0 GiB   2.0 GiB idea\n  2348   2.8  7.8  11.3 GiB   1.2 GiB java\n  2148   2.5  3.5   6.7 GiB 572.8 MiB QQ\n   643   1.9  2.5   5.9 GiB 412.7 MiB WeChat\n   454   0.9  1.2 101.8 GiB 204.6 MiB com.apple.WebKit.WebContent",
        // "osMxBean": "CPU load: 16.1% (OS MXBean)",
        // "processesThreads": "1032",
        // "pidProcessesList": "PID  %CPU %MEM       VSZ       RSS Name  3663  12.5 29.2   5.7 GiB   2.2 GiB java\n 25041  10.6 18.3   5.7 GiB   1.4 GiB java\n  2983   0.3  0.1 722.9 MiB  11.0 MiB barad_agent\n  2594   0.3  7.4   3.0 GiB 576.3 MiB java\n   616   0.2  1.4 249.4 MiB 106.0 MiB YDService",
        // "sensorsCpuTemperature": "CPU Temperature: 0.0°C",
        // "sensorsFanSpeed": "Fan Speeds: []",
        // "cpuVoltage": "CPU Voltage: 0.0V",
        // "networkInterfaces": "Network interfaces: Name: eth0 (eth0)\n   MAC Address: 52:54:00:1a:60:65 \n   MTU: 1500, Speed: 0 bps \n   IPv4: [172.17.0.6] \n   IPv6: [fe80:0:0:0:5054:ff:fe1a:6065]",
        // "createTime": "2020-05-28T01:02:25.000+00:00",
        // "updateTime": "2020-05-28T01:02:29.000+00:00"
      ],
      formLabelWidth: "1000px"
    };
  },
  methods: {
    getListInfo() {
      this.$axios({
        method: "get",
        url: this.baseUrl + "/system"
      })
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            // 人员信息的最后一条是管理员信息，删除后显示
            console.log(res.data.data);
            let computerData = res.data.data;
            let computerAll = [];
            for (var i in computerData) {
              // console.log(i); //获得对象中键值对的“键”
              // console.log(computerData[i]); //获得对象中键值对的“值”
              let item = {
                key: "",
                value: ""
              };
              if (i == "manufacturer") {
                item.key = "生产商";
                item.value = computerData[i];
                computerAll.push(item);
              }
              if (i == "firmwareManufacturer") {
                item.key = "固件制造商";
                item.value = computerData[i];
                computerAll.push(item);
              }
              if (i == "firmwareReleaseDate") {
                item.key = "固件发布日期";
                item.value = computerData[i];
                computerAll.push(item);
              }
              if (i == "physicalProcessorCount") {
                item.key = "物理处理器计数";
                item.value = computerData[i];
                computerAll.push(item);
              }
              if (i == "identifier") {
                item.key = "标识符";
                item.value = computerData[i];
                computerAll.push(item);
              }
              if (i == "processorId") {
                item.key = "处理器id";
                item.value = computerData[i];
                computerAll.push(item);
              }
              if (i == "totalMemory") {
                item.key = "总内存";
                item.value = computerData[i];
                computerAll.push(item);
              }
            }
            this.tableData = computerAll;
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
.phyware {
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
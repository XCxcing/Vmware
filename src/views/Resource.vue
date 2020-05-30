<template>
  <div class="resource">
    <h3 style="font-size:20px;line-height:60px;font-weight:700;">查看资源记录</h3>
    <div class="select">
      <div class="block date">
        <div class="left">
          <span class="demonstration">开始日期：</span>
          <el-date-picker
            v-model="star"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="right">
          <span class="demonstration">结束日期：</span>
          <el-date-picker
            v-model="end"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="buttons">
        <div class="checkbox">
        <div :class="tabbar==1?'actives':''" @click="change(1)">所有</div>
        <div :class="tabbar==2?'actives':''" @click="change(2)">虚拟机</div>
        <div :class="tabbar==3?'actives':''" @click="change(3)">公网ip</div>
        <div :class="tabbar==4?'actives':''" @click="change(4)">网络方案</div>
        <div :class="tabbar==5?'actives':''" @click="change(5)">VPN用户</div>
      </div>
      <el-button type="primary" round class="but" @click="showdata()">搜索</el-button>
      </div>
    </div>
    
    <el-table :data="forData" stripe border style="width: 761px;margin:0 auto;" align="center">
      <el-table-column prop="id" label="编号" width="120" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120" align="center"></el-table-column>
      <el-table-column prop="type" label="状态" width="120" align="center"></el-table-column>
      <el-table-column prop="createTime" label="开始时间" width="200" align="center" :formatter="crTime"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="200" align="center" :formatter="enTime"></el-table-column>
    </el-table>
  </div>
</template>

<script>
var _self;
export default {
  name:"resource",
  data() {
    return {
      allData:[],
      forData:[],
      userData:[],
      tabPosition:1,
      tabbar:1,
      star:'',
      end:''
    };
  },
  methods:{ 
    showdata(){
      // console.log(this.tabbar,this.star,this.end);
      var stars = this.changeDate(this.star);
      var ends = this.changeDate(this.end);
      if(ends<stars){
        this.$message({
          showClose: true,
          message: "请正确输入起止日期",
          type: "error"
        });
        return;
      }
      if(ends==stars){
        ends = ends + 86399999;
      }
      let state = '';
      switch(this.tabbar){
        case 2:
          state='虚拟机';
          break;
        case 3:
          state='公网ip';
          break;
        case 4:
          state='网络方案';
          break;
        case 5:
          state='VPN用户';
          break;
      }
      this.forData = [];
      if(this.tabbar==1){
        for(var i=0;i<this.allData.length;i++){
          if(this.allData[i].createTime>stars && this.allData[i].endTime<ends){
            this.forData.push(this.allData[i]);
          }
       }
      }else{
        for(var i=0;i<this.allData.length;i++){
          if(this.allData[i].createTime>stars && this.allData[i].endTime<ends){
            if(this.allData[i].type==state){
              this.forData.push(this.allData[i]);
            }
          }
       }
      }
    },
    change(data){
      this.tabbar = data;
    },
    changeDate(date){
      var times = new Date(date).getTime();
			return times;
    },
    showDate(date){
      var times = new Date(date).toLocaleString();
			return times;
    },
    enTime(val){
      let entime = this.showDate(val.endTime)
      return entime;
    },
    crTime(val){
      let crtime = this.showDate(val.createTime)
      return crtime;
    }
  },
  created(){
    // console.log(this.forData);
    _self = this;
    this.$axios({
      method: "get",
      url: this.baseUrl + "/user/find"
    }).then(ref=>{
          if (ref.data.status == 200) {
          this.userData = ref.data.data.users;
          this.$axios({
          method: "post",
          url: this.baseUrl + "/vmware",
          data:{
            "pageNumber": 1,
            "pageSize": 90
          }
          }).then(res=>{
            // console.log(res);
            if(res.data.status==200){
              _self.allData = res.data.data.systemVmwares;
              for(var i=0;i<res.data.data.systemVmwares.length;i++){
                var tes = _self.changeDate(res.data.data.systemVmwares[i].createTime);
                _self.allData[i].createTime = tes;
                _self.allData[i].endTime = tes + 3600000;
                // console.log(res.data.data.systemVmwares[i].memory);
                var testtype = res.data.data.systemVmwares[i].memory.split(" ",1);
                // console.log(testtype);
                if(testtype<0.5){
                  _self.allData[i].type = "公网ip";
                }
                if(testtype<1 && testtype>=0.5){
                  _self.allData[i].type = "VPN用户";
                }
                if(testtype<1.5 && testtype>=1){
                  _self.allData[i].type = "网络方案";
                }
                if(testtype>=1.5){
                  _self.allData[i].type = "虚拟机";
                }
                for(var k=0;k<_self.userData.length;k++){
                  if(_self.userData[k].id == res.data.data.systemVmwares[i].createUser){
                    _self.allData[i].username = _self.userData[k].username;
                    break;
                  }
                }
              };
              _self.allData.reverse();
              _self.forData = _self.allData;
              // console.log(res.data.data.systemVmwares);
              // console.log(_self.allData);
              // console.log(_self.forData);
              // console.log(_self.userData);
            }
          }).catch(err=>{
            // console.log(err);
          })
        } else {
          this.$message({
            showClose: true,
            message: "人员获取失败",
            type: "error"
          });
        }
    }).catch(err=>{
      // console.log(err);
    })
  }
}
</script>

<style scoped lang="scss">
.select{
  .date{
    display: flex;
    div{
      flex: 1;
    }
  }
  .buttons{
    display: flex;
    justify-content: space-around;
    margin:20px 0;
    .checkbox{
      width: 400px;
      border:1px solid #000;
      border-radius: 8px;
      height: 45px;
      display: flex;
      div{
        flex:1;
        font-size: 12px;
        line-height: 45px;
        text-align: center;
        border-left: 1px solid #000;
        cursor: pointer;
      }
      :first-child{
        border:none;
        border-radius: 8px 0 0 8px;
      }
      :last-child{
        border-radius: 0 8px 8px 0;
      }
    }
    .but{
      height: 40px;
    }
  }
}

.actives{
  background-color: #409EFF;
  color: #fff;
}
</style>
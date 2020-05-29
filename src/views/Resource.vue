<template>
  <div class="resource">
    <el-table :data="forData" stripe border style="width: 1221px;margin:0 auto;" align="center">
      <el-table-column prop="id" label="人员id" width="120" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" width="120" align="center"></el-table-column>
      <el-table-column prop="type" label="状态" width="140" align="center"></el-table-column>
      <el-table-column prop="createTime" label="开始时间" width="120" align="center"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="140" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:"resource",
  data() {
    return {
      forData:[
        {
          id:1,
          name:"admin",
          type:"IP",
          createTime:"2020/2/2",
          endTime:"2020/2/3"
        },
        {
          id:2,
          name:"admin",
          type:"DNS",
          createTime:"2020/3/2",
          endTime:"2020/3/3"
        },
        {
          id:3,
          name:"admin",
          type:"网端",
          createTime:"2020/4/2",
          endTime:"2020/4/3"
        }
      ],
    };
  },
  methods:{ 

  },
  created(){
    console.log(this.forData);
  }
}
</script>

<style>

</style>
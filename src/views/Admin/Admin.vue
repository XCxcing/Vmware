<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col class="logo" :span="8" :style="{width:isCollapse?'64px':'200px'}">
            <strong>{{isCollapse?'资源':'资源系统'}}</strong>
          </el-col>
          <el-col class="info" :span="8">
            <i
              :class="isCollapse?'el-icon-caret-right':'el-icon-caret-left'"
              @click="isCollapse=!isCollapse"
            ></i>
          </el-col>
          <el-col :span="8" class="adminInfo">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-delete">退出登录</i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="upLogin">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container :style="mins">
        <el-aside :style="{width:isCollapse?'auto':'200px'}">
          <!--        router:布尔值，如果值为true说明我要开启路由模式
          default-active:将哪一个路由设置为选中项。-->



          <!-- <el-menu
            :default-openeds="['1','2','3']"
            :collapse-transition="false"
            :router="true"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">信息管理</span>
              </template>
              <el-menu-item index="/user" v-show="type">用户管理</el-menu-item>
              <el-menu-item index="/changepwd">修改密码</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">主机管理</span>
              </template>
              <el-menu-item index="/phyware">物理机</el-menu-item>
              <el-menu-item index="/vmware">虚拟机</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">数据详情</span>
              </template>
              <el-menu-item index="/resource">资源记录</el-menu-item>
            </el-submenu>
          </el-menu> -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :router="true"
            :default-openeds="['1','2','3']"
            :collapse-transition="false"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :style="mins">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">信息管理</span>
              </template>
              <el-menu-item index="/user" v-show="type">用户管理</el-menu-item>
              <el-menu-item index="/changepwd">修改密码</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">主机管理</span>
              </template>
              <el-menu-item index="/phyware">物理机详情</el-menu-item>
              <el-menu-item index="/vmware">虚拟机</el-menu-item>
              <el-menu-item index="/utilization">资源使用率</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">数据详情</span>
              </template>
              <el-menu-item index="/resource">资源记录</el-menu-item>
            </el-submenu>
          </el-menu>




        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      type: false,
      mins:{
        minHeight:document.body.clientHeight - 60 + 'px'
      }
    };
  },
  methods: {
    upLogin() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  },
  created() {
    // console.log(sessionStorage.type)
    // alert(document.body.clientHeight);
    if (sessionStorage.type == "管理员") {
      this.type = true;
    } else {
      this.type = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  // width: 238px;
  // min-height: 1000px;
  height: 100%;
}
.el-header {
  padding: 0px !important;
  background: #000;
  color: #ffffff;
  .info {
    font-size: 30px;
    line-height: 60px;
    text-align: left;
    text-indent: 20px;
    
  }
  .logo {
    text-align: center;
    // width: 200px;
    font-size: 25px;
    line-height: 60px;
    border-right: 1px solid rgba(238, 241, 146, 0.3);
  }
  .adminInfo {
    float: right;
    text-align: right;
    padding-right: 20px;
    line-height: 60px;
    .el-dropdown-link {
      color: #AFB1B5;
      span {
        color: #fff;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
}
.toolbar {
  background: #f4f4f4;
  padding: 10px;
  margin: 20px 0 !important;
}
.el-table th,
.el-table td {
  text-align: center !important;
}
.toolbar .el-form-item {
  margin-bottom: 0px;
}
</style>

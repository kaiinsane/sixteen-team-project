<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <el-row type="flex" class="tab_menu">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登录/用户信息 -->
      <el-row type="flex" align="middle">
        <div v-if="$store.state.user.userInfo.token">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img
                :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`"
              />
              {{ $store.state.user.userInfo.user.nickname }}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else>
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$store.commit("user/clearUserInfo");
            this.$message({
                type:"success",
                message: "退出成功"
            })
    }
  },
  mounted() {
    console.log(this.$store.state.user.userInfo.user);
  }
};
</script>

<style lang="less" scoped>
.logo {
  img {
    margin-top: 9px;
    display: block;
    width: 156px;
    height: 42px;
  }
}
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;

  .main {
    width: 1000px;
    margin: 0 auto;
  }
}
.tab_menu {
  flex: 1;
  margin-left: 20px;
  a {
    display: block;
    padding: 0 20px;
    box-sizing: border-box;

    &:hover {
      color: #409eff;
      border-bottom: 5px solid #409eff;
    }
  }
  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}
.el-dropdown-link img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
  box-sizing: border-box;
  border:2px solid #fff;
  &:hover{
    border:2px solid #409eff;
  }
}
nuxt-link {
  padding: 0 10px;
}
</style>
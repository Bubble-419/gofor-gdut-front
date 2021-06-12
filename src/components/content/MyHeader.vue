<template>
  <header>
    <div class="logo"><img src="~assets/images/logo.png" alt="" /></div>
    <div class="search">
      <input
        type="search"
        placeholder="请按地址搜索..."
        class="search"
        v-model="keywords"
        @keyup.enter="search"
      />
    </div>
    <div v-if="!isLogin" key="loginHeader" class="login-header">
      <router-link to="/manager" tag="span" class="manager" v-if="roleId < 3"
        >管理员入口</router-link
      >
      <div class="user-center">
        <el-button type="primary">我要发布</el-button>
        <el-menu
          menu-trigger="hover"
          mode="horizontal"
          active-text-color="var(--theme-medium-green)"
          :router="true"
        >
          <el-submenu index="1">
            <template #title>
              <el-avatar size="medium" :src="userIcon"></el-avatar>
            </template>
            <el-menu-item index="/userinfo">个人中心</el-menu-item>
            <el-menu-item index="/my-published">我的订单</el-menu-item>
            <el-menu-item index="/history">历史浏览</el-menu-item>
            <el-menu-item index="/" @click="toLogout">退出账号</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>

    <el-button
      v-else
      key=""
      class="login"
      @click="$router.push({ name: 'LoginPage' })"
      >登录/注册</el-button
    >
  </header>
</template>

<script>
import { computed, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { searchByKeywords } from "network/header.js";
import { logout } from "network/user.js";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
export default {
  name: "MyHeader",
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.state.user);
    const keywords = ref("");
    const search = () => {
      searchByKeywords(keywords);
    };
    const toLogout = () => {
      ElMessageBox.confirm("确定要退出当前账号吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        logout().then((res) => {
          if (res.status == 200) {
            // 清除token
            window.localStorage.setItem("token", "");
            router.go(0);
          }
        });
      });
    };
    return {
      ...toRefs(user),
      keywords,
      search,
      toLogout,
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: var(--font-color);
  z-index: 100;
}

.logo {
  height: 42px;
  line-height: 42px;
}

.login {
  width: 180px;
  height: 30px;
}

.search {
  position: relative;
}

.search input {
  width: 25px;
  height: 25px;
  padding: 10px;
  border: solid 3px var(--theme-medium-green);
  background: transparent;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.5s;
}

.search::after {
  content: "";
  position: absolute;
  bottom: 19px;
  right: -4px;
  width: 3px;
  height: 15px;
  background: var(--theme-medium-green);
  transform: rotate(135deg);
}

.search input:focus {
  width: 250px;
  padding: 18px;
  cursor: default;
}

.login-header,
.user-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.login-header {
  width: 340px;
  margin-left: 100px;
}

.user-center {
  width: 250px;
}

.manager {
  font-size: 0.9em;
}

.manager:hover {
  color: var(--theme-medium-green);
  text-decoration: underline;
}
</style>
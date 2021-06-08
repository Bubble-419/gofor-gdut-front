<template>
  <div id="login">
    <h2>LOG IN</h2>
    <el-form status-icon :model="loginInfo">
      <el-form-item
        prop="username"
        :rules="[{ validator: checkUsername, trigger: 'blur' }]"
      >
        <el-input
          placeholder="学号"
          v-model.number="loginInfo.username"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ validator: checkPwd, trigger: 'blur' }]"
      >
        <el-input
          type="password"
          placeholder="密码"
          v-model="loginInfo.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
    <p>{{ username }},{{ password }}</p>
    <a href="#">忘记密码？</a>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from "vue";
import { login } from "network/user.js";
import { checkUsername, checkPwd } from "@/utils/formRules.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const instance = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const loginInfo = reactive({
      username: "",
      password: "",
    });

    const onSubmit = () => {
      login(loginInfo).then((res) => {
        if (res.code == "200") {
          window.localStorage.setItem("token", res.object.token);
          store.commit("setUser", {
            isLogin: true,
            roleId: res.object.roleId,
            userIcon: res.object.userIcon,
          });
          instance.proxy.$notify({
            title: "登陆成功",
            type: "success",
          });
          setTimeout(() => {
            router.go(-1);
          }, 500);
        }
      });
    };

    return {
      loginInfo,
      checkUsername,
      checkPwd,
      onSubmit,
    };
  },
};
</script>

<style scoped>
</style>
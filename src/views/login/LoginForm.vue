<template>
  <div id="login">
    <h2>LOG IN</h2>
    <el-form status-icon :model="loginForm" :rules="rules" ref="loginInfo">
      <el-form-item prop="username">
        <el-input
          placeholder="学号"
          v-model.number="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item class="input-captcha" prop="captcha">
        <el-input v-model="loginForm.captcha"></el-input>
        <captcha></captcha>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
    <a href="#">忘记密码？</a>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { login } from "network/user.js";
import { checkUsername, checkPwd } from "@/utils/formRules.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Captcha from "components/content/Captcha";

export default {
  name: "Login",
  components: { Captcha },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      loginForm: {
        username: "",
        password: "",
        captcha: "",
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: checkPwd, trigger: "blur" }],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
    });
    const loginInfo = ref(null);

    const onSubmit = () => {
      loginInfo.value.validate((valid) => {
        if (valid) {
          loginInfo.value = state.loginForm;
          login(loginInfo.value).then((res) => {
            if (res.code == "200") {
              window.localStorage.setItem("token", res.object.token);
              store.commit("setisLogin", true);
              store.commit("setUser", {
                userId: res.object.userId,
                username: res.object.username,
                roleId: res.object.roleId,
                userIcon: res.object.userIcon,
              });
              setTimeout(() => {
                router.go(-1);
              }, 500);
            }
          });
        } else return false;
      });
    };

    return {
      ...toRefs(state),
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
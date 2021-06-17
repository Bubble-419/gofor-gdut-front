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
      <el-form-item class="input-captcha" prop="code">
        <el-input v-model="loginForm.code" placeholder="点击更换图片"></el-input>
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
import {reactive, ref, toRefs} from "vue";
import {login, getUserInfo} from "network/user.js";
import {checkUsername, checkPwd} from "@/utils/formRules.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import Captcha from "components/content/Captcha";

export default {
  name: "Login",
  components: {Captcha},
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      captchaUrl: '/captcha?time=' + new Date(),
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [{validator: checkUsername, trigger: "blur"}],
        password: [{validator: checkPwd, trigger: "blur"}],
        code: [
          {required: true, message: "验证码不能为空", trigger: "blur"},
        ],
      },
    });
    const loginInfo = ref(null);

    const onSubmit = () => {
      loginInfo.value.validate((valid) => {
        if (valid) {
          (async () => {
            loginInfo.value = state.loginForm;
            await login(loginInfo.value).then(res => {
              if (res.code == 200) {
                window.localStorage.setItem("token", res.object.token);
                store.commit("setIsLogin", true);
              }
            });
            await getUserInfo().then(res => {
              window.localStorage.setItem("user", JSON.stringify(res))
              store.commit("setUser", {
                user: window.localStorage.getItem('user'),
              });
            });
          })();
          router.go(-1);
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
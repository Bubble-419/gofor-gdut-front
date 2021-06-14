<template>
  <div id="register">
    <h2>SIGN UP</h2>
    <el-form status-icon :model="regForm" ref="regInfo" :rules="rules">
      <el-form-item prop="username">
        <el-input
          placeholder="请输入你的学号"
          v-model.number="regForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          placeholder="请输入你的姓名"
          v-model="regForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="regForm.sex" disabled>
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="regForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          placeholder="请确认密码"
          v-model="regForm.checkPass"
        ></el-input>
      </el-form-item>
      <el-form-item class="input-captcha" prop="captcha">
        <el-input v-model="regForm.captcha"></el-input>
        <captcha></captcha>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { register } from "network/user.js";
import { checkUsername, checkPwd } from "@/utils/formRules.js";
import Captcha from "components/content/Captcha";

export default {
  name: "Register",
  components: { Captcha },
  setup() {
    const router = useRouter();
    const state = reactive({
      regForm: {
        username: "",
        password: "",
        checkPass: "",
        name: "",
        sex: "",
        captcha: "",
      },
      rules: {
        username: { validator: checkUsername, trigger: "blur" },
        name: { required: true, message: "姓名不能为空", trigger: "blur" },
        sex: { required: true, message: "请选择你的性别", trigger: "change" },
        password: { validator: checkPwd, trigger: "blur" },
        checkPass: { validator: confirmPwd, trigger: "blur" },
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
    });
    const regInfo = ref(null);

    watch(
      () => state.regForm.username,
      (username) => {
        console.log(username);
        if (username.toString().charAt(1) == "1") {
          state.regForm.sex = "男";
        } else if (username.toString().charAt(1) == "2") {
          state.regForm.sex = "女";
        }
      },
      { deep: true }
    );

    const confirmPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != state.regForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const onSubmit = () => {
      regInfo.value.validate((valid) => {
        if (valid) {
          regInfo.value = computed(() => {
            return {
              username: state.regForm.username,
              password: state.regForm.password,
              name: state.regForm.name,
              sex: state.regForm.sex == "男" ? 0 : 1,
            };
          });
          register(state.regForm.captcha, regInfo.value).then((res) => {
            if (res.status == "200") {
              setTimeout(() => {
                router.push({ name: "Home" });
              }, 1000);
            }
          });
        } else return false;
      });
    };

    return {
      ...toRefs(state),
      regInfo,
      checkUsername,
      checkPwd,
      confirmPwd,
      onSubmit,
    };
  },
};
</script>

<style scoped>
</style>
<template>
  <div id="register">
    <h2>SIGN UP</h2>
    <el-form status-icon :model="regInfo">
      <el-form-item
        prop="username"
        :rules="[{ validator: checkUsername, trigger: 'blur' }]"
      >
        <el-input
          placeholder="请输入你的学号"
          v-model.number="regInfo.username"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="name"
        :rules="[{ required: true, message: '姓名不能为空', trigger: 'blur' }]"
      >
        <el-input
          placeholder="请输入你的姓名"
          v-model="regInfo.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="sex"
        :rules="[
          { required: true, message: '请选择你的性别', trigger: 'blur' },
        ]"
      >
        <el-radio-group v-model="regInfo.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ validator: checkPwd, trigger: 'blur' }]"
      >
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="regInfo.password"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="checkPass"
        :rules="[{ validator: checkPwd2, trigger: 'blur' }]"
      >
        <el-input
          type="password"
          placeholder="请确认密码"
          v-model="regInfo.checkPass"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { computed, getCurrentInstance, reactive } from "vue";
import { useRouter } from "vue-router";
import { register } from "network/user.js";
import { checkUsername, checkPwd } from "@/utils/formRules.js";
export default {
  name: "Register",
  setup() {
    const instance = getCurrentInstance();
    const router = useRouter();
    const regInfo = reactive({
      username: "",
      password: "",
      checkPass: "",
      name: "",
      sex: "",
    });

    const trimRegInfo = computed(() => {
      return {
        username: regInfo.username,
        password: regInfo.password,
        name: regInfo.name,
        sex: regInfo.sex == "男" ? 0 : 1,
      };
    });

    const checkPwd2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != regInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const onSubmit = () => {
      register(trimRegInfo.value).then((res) => {
        if (res.status == "200") {
          instance.proxy.$notify({
            title: "注册成功，请登录",
            type: "success",
          });
          setTimeout(() => {
            router.push({ name: "Home" });
          }, 1000);
        }
      });
    };

    return {
      regInfo,
      checkUsername,
      checkPwd,
      checkPwd2,
      onSubmit,
    };
  },
};
</script>

<style scoped>
</style>
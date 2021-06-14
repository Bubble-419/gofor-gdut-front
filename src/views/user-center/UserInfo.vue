<template>
  <div id="user-info">
    <!-- 头像上传模块，上传地址action待修改 -->
    <el-upload
      class="avator-upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :multiple="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="user.userIcon" :src="user.userIcon" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- 其他修改信息模块 -->
    <el-form :model="user">
      <el-form-item label="姓名" prop="name">
        <el-input :placeholder="user.name" v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="userContact">
        <el-input
          :placeholder="user.userContact"
          v-model="user.userContact"
        ></el-input>
      </el-form-item>
      <el-form-item label="所在校区">
        <el-select v-model="user.userPosition">
          <el-option
            v-for="p in positions"
            :key="p.value"
            :label="p.label"
            :value="p.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate" :disabled="isDisabled"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from "network/user.js";
import { onMounted, reactive, toRefs, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";

export default {
  name: "UserInfo",
  setup() {
    const store = useStore();
    const state = reactive({
      user: {},
      isDisabled: true,
      positions: store.state.positions,
    });
    const handleAvatarSuccess = (res, file) => {
      state.user.userIcon = URL.createObjectURL(file.raw);
    };
    onBeforeRouteLeave((to, from, next) => {
      // 信息已修改但未提交
      if (state.isDisabled == false) {
        ElMessageBox.confirm(
          "已修改的信息尚未保存，是否离开当前页面？",
          "提示",
          {
            confirmButtonText: "离开页面",
            cancelButtontext: "留在当前页面",
            type: "warning",
          }
        )
          .then(() => {
            next();
          })
          .catch(() => {
            console.log(to.path, from.path);
            next(from.path);
          });
      } else next();
    });
    const onUpdate = () => {
      updateUserInfo(state.user);
      state.isDisabled = true;
    };
    onMounted(() => {
      getUserInfo().then((res) => {
        state.user = res;
      });
      watch(
        () => [state.user],
        () => {
          if (state.isDisabled == true) {
            state.isDisabled = false;
          }
        },
        { deep: true }
      );
    });

    return {
      ...toRefs(state),
      onUpdate,
      handleAvatarSuccess,
    };
  },
};
</script>

<style scoped>
#user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-form {
  width: 300px;
}

.avator-upload {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  text-align: center;
  line-height: 120px;
  border: 1px dashed var(--font-title-color);
  cursor: pointer;
  margin-bottom: 30px;
  overflow: hidden;
}

img.avator {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.el-button {
  width: 100%;
  margin-top: 40px;
}
</style>
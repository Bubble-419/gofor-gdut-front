<template>
  <div id="complain">
    <el-form :model="complainForm" :rules="rules" ref="complainInfo">
      <el-form-item label="投诉类型" prop="type">
        <el-select v-model="complainForm.type">
          <el-option label="接单人问题" value="接单人问题"></el-option>
          <el-option label="网页使用问题" value="网页使用问题"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投诉细节" prop="complainDetails">
        <el-input
          type="textarea"
          :rows="3"
          v-model="complainForm.complainDetails"
          placeholder="描述一下你遇到的问题，不少于10个字，不超过200个字..."
        ></el-input>
      </el-form-item>
      <el-form-item class="pic-upload">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture"
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus">上传图片</i>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img width="100%" :src="complainForm.complainPic" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="sub-btn"
          >提交反馈</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { complain } from "network/user.js";
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  name: "Complain",
  setup() {
    const store = useStore();
    const state = reactive({
      complainForm: {
        type: "接单人问题",
        complainDetails: "",
        complainPic: "",
      },
      rules: {
        type: [{ required: true, message: "类别不能为空", trigger: "blur" }],
        complainDetails: [
          {
            validator: (rule, value, callback) => {
              if (value !== "") {
                if (value.length < 10 || value.length > 20) {
                  callback(new Error("字数不得少于10个字或多于200个字"));
                }
              } else callback();
            },
          },
        ],
      },
    });
    const complainInfo = ref(null);
    const onSubmit = () => {
      complainInfo.value.validate((valid) => {
        if (valid) {
          complainInfo.value = computed(() => {
            return {
              userId: store.state.user.userId,
              type: state.complainForm.type,
              complainDetails: state.complainForm.complainDetails,
              complainPic: state.complainForm.complainPic,
            };
          });
          complain(complainInfo.value);
        }
      });
    };
    return {
      ...toRefs(state),
      onSubmit,
      complainInfo,
    };
  },
};
</script>

<style scoped>
.pic-upload {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 3px;
  border: 1px dashed var(--font-title-color);
  background-color: var(--bg-color);
  cursor: pointer;
}

.sub-btn {
  float: right;
}
</style>
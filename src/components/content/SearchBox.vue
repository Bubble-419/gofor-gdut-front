<template>
  <div style="margin-top: 25px;">
    <el-input
        placeholder="请输入内容"
        v-model="input1"
        class="input-with-select"
    >
      <template #append>
        <el-button icon="el-icon-search" @click="handlesearch"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "SearchBox",
  emits:['search'],
  setup(context) {
    const input1 =ref('');
    const handlesearch=()=>{
      context.emit('search',input1.value)
    }
    return {
      input1,
      handlesearch
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 530px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<template>
  <div class="block">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
        >
    </el-pagination>
  </div>
</template>

<script>
import {ref, toRefs} from "vue";

export default {
  name: "PaginationBox",
  props:{
    totalpage:{
      type:Number,
      default:0
    }
  },
  emits:['page','size'],
  setup(props,context){
    let currentPage=ref(1);
    let pageSize =ref(20);
    const handleCurrentChange=(val)=>{
      currentPage.value=val;
      context.emit('page',val);
    }
    const handleSizeChange=(val)=>{
      pageSize.value=val;
      console.log(val)
      context.emit('size',val);
    }
    return {
      ...toRefs(props),
      currentPage,
      pageSize,
      handleCurrentChange,
      handleSizeChange
    }
  }
}
</script>

<style scoped>
.el-pagination{
  padding: 20px;
  background-color: #FFFFFF;
}
</style>
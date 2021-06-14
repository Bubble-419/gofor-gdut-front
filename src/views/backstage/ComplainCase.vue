<template>
  <div class="selectdate">
    <el-date-picker
        v-model="month"
        type="month"
        :disabled-date="disabledDate"
        size="medium"
        placeholder="选择月">
    </el-date-picker>
  </div>
  <el-table
      :data="cases.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%" class="tablebox">
    <el-table-column
        prop="complainTime"
        label="日期"
        width="190"
        column-key="date"
        sortable
    >
    </el-table-column>
    <el-table-column
        prop="type"
        label="投诉类型"
        width="180"
        :filters="[{ text: '网页使用问题', value: '网页使用问题' }, { text: '接单人问题', value: '接单人问题' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
      <template #default="scope">
        <el-tag
            :type="typeColor(scope.row.tag)"
            disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
        label="投诉编号"
        prop="complainId">
    </el-table-column>
    <el-table-column
        label="用户姓名投诉反馈人账号"
        prop="userId">
    </el-table-column>
    <el-table-column
        label="投诉详情"
        width="450"
        prop="complainDetails">
    </el-table-column>
    <el-table-column
        label="投诉图片"
        prop="name">
      <template v-slot="scope">
        <div class="demo-image__preview">
          <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.complainPic"
              :preview-src-list="[scope.row.complainPic]">
          </el-image>
        </div>
      </template>
    </el-table-column>
    <el-table-column
        label="状态"
        :filters="[{ text: '已读', value: 1 }, { text: '未读', value: 0 }]"
        :filter-method="filterisRead"
        filter-placement="bottom-end">
      <template v-slot="scope">
        <el-link href="javascript:;" @click="change(scope.$index)" v-if="scope.row.isread==0">
          <span style="color: #bd2c00">未读</span>
          <i class="el-icon-message el-icon--right" style="color: #bd2c00"></i>
        </el-link>
        <el-link href="javascript:;" :underline="false" v-else>
          <span style="color: #6E7783">已读</span><i class="el-icon-view el-icon--right" style="color: #6E7783"></i>
        </el-link>
      </template>
    </el-table-column>
  </el-table>
  <PaginationBox :totalpage="totalpage" @page="changepage" @size="changesize"></PaginationBox>
</template>

<script>
import { searchcomplain , changecomplain ,selectisread ,selectread ,selectmonth } from 'network/Complain.js';
import { onMounted, ref ,watch } from "vue";
import PaginationBox from '@/components/content/PaginationBox.vue';
export default {
  name: "ComplainCase",
  components:{
    PaginationBox
  },
  setup(){
    const cases =ref([]); //获取反馈列表
    let totalpage =ref();       //总页数
    let pagesize =ref(20); //每一页数量
    let screen =ref();  //记录筛选类型
    let month=ref();
    //获取所有投诉反馈
    let searchComlains =(currentpage,pagesize)=>{
      searchcomplain(currentpage,pagesize).then(res =>{
        const complains=res.object.records.filter((item)=>{
          item.complainTime=new Date(item?.complainTime);
        })
        cases.value=complains;
        totalpage.value=res.total;
        console.log(res);
      });
    }
    //获取筛选月份后的投诉反馈
    let selectMonth = (currentpage,pagesize,time)=>{
      selectmonth(currentpage,pagesize,time).then(res =>{
        const complains=res.object.records.filter((item)=>{
          item.complainTime=new Date(item?.complainTime);
        })
        cases.value=complains;
        totalpage.value=res.total;
        console.log(res);
      });
    }
    //获取筛选过状态后的投诉反馈
    let selectIsread =(currentpage,pagesize)=>{
      selectisread(1,pagesize.value).then(res=>{
        const complains=res.object.records.filter((item)=>{
          item.complainTime=new Date(item?.complainTime);
        })
        cases.value=complains;
        totalpage.value=res.total;
      })
    }
    //筛选已读状态投诉反馈
    let selectRead =(currentpage,pagesize)=>{
      selectread(1,pagesize.value).then(res=>{
        const complains=res.object.records.filter((item)=>{
          item.complainTime=new Date(item?.complainTime);
        })
        cases.value=complains;
        totalpage.value=res.total;
      })
    }
    onMounted(()=>{
      screen.value ='no';
      searchComlains(1,20);
    })
    //切换页数和单页数量
    const changepage =(data)=>{
      if(screen.value=='no'){
        searchComlains(data,pagesize.value);
      }else if(screen.value=='isread'){
        selectIsread(data,pagesize.value);
      }else if(screen.value=='read'){
        selectRead(data,pagesize.value);
      }else if(screen.value =='choicemonth'){
        selectMonth(data,pagesize.value,month.value);
      }
    }
    const changesize =(data)=>{
      if(screen.value=='no'){
        searchComlains(1,data);
      }else if(screen.value=='isread'){
        selectIsread(1,data);
      }else if(screen.value=='read'){
        selectRead(1,data);
      }else if(screen.value =='choicemonth'){
        selectMonth(1,data,month.value);
      }

    }
    //筛选投诉反馈类型
    const typeColor = (type) => {
      switch (type) {
        case '接单人问题':
          return 'warning';
        case '网页使用问题' :
          return 'success';
      }
    }
    const filterTag = (value, row) => {
      return row.type === value;
    }
    //筛选已读 未读状态
    const filterisRead = (value) => {
      if(value==0){
        screen.value ='isread';
        selectIsread(1,pagesize.value);
      }else{
        screen.value ='read';
        selectRead(1,pagesize.value);
      }
    }
    //修改未读状态为已读
    const change =(index)=>{
      changecomplain().then(()=>{
        cases.value[index].isread=1;
      });
    }
    //监听日期选择
    watch(month,()=>{
      screen.value ='choicemonth';
      selectMonth(1,pagesize.value,month.value);
    })
    //禁用未来的日期
    const disabledDate=(time)=>{
      return time.getTime() > Date.now()
    }
    return {
      typeColor,
      filterTag,
      cases,
      filterisRead,
      change,
      totalpage,
      month,
      changepage,
      changesize,
      disabledDate
    }
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style scoped>
.el-table /deep/th{
  padding: 0;
  height: 70px;
}
.el-table /deep/td{
  padding: 0;
  height: 200px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
}
.selectdate{
  float: left;
}
</style>
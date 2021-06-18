<template>
  <el-table
      :data="cases.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%" class="tablebox">
    <el-table-column
        prop="complainTime"
        label="日期"
        width="190"
        column-key="date"
        sortable
        :formatter="dateFormat"
    >
      <template #header>
        <div class="selectdate">
          <el-date-picker
              v-model="month"
              type="month"
              :disabled-date="disabledDate"
              size="medium"
              placeholder="选择月"
              style="width: 15vh"
          >
          </el-date-picker>
        </div>
      </template>
    </el-table-column>
    <el-table-column
        prop="type"
        label="投诉类型"
        :filters="[{ text: '网页使用问题', value: '网页使用问题' }, { text: '接单人问题', value: '接单人问题' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
      <template #default="scope">
        <el-tag
            :type="typeColor(scope.row.type)"
            disable-transitions>{{scope.row.type}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
        label="投诉编号"
        prop="complainId">
    </el-table-column>
    <el-table-column
        label="投诉用户 ID"
        prop="userId">
    </el-table-column>
    <el-table-column
        label="投诉详情"
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
        >
      <template #header>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              状态<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item><el-checkbox label="已读" v-model="checked[0]"></el-checkbox></el-dropdown-item>
                <el-dropdown-item><el-checkbox label="未读" v-model="checked[1]"></el-checkbox></el-dropdown-item>
                <div style="text-align: center">
                  <el-button type="text" id="select" @click="filterread">筛选</el-button>
                  <span>|</span>
                  <el-button type="text" id="candle" @click="reset">重置</el-button>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
      </template>
      <template v-slot="scope">
        <el-link href="javascript:;" @click="change(scope.$index,scope.row.complainId)" v-if="scope.row.isread==0">
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
import moment from "moment";
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
    let checked=ref([false,false]);
    //获取所有投诉反馈
    let searchComlains =(currentpage,pagesize)=>{
      searchcomplain(currentpage,pagesize).then(res =>{
        cases.value=res.object.records;
        totalpage.value=res.object.total;
        console.log(res);
      });
    }
    //获取筛选月份后的投诉反馈
    let selectMonth = (currentpage,pagesize,time)=>{
      time=moment(time).format("YYYY-MM")
      selectmonth(currentpage,pagesize,time).then(res =>{
        cases.value=res.object.records;
        totalpage.value=res.object.total;
      });
    }
    //获取筛选过状态后的投诉反馈
    let selectIsread =(currentpage,pagesize)=>{
      selectisread(1,pagesize.value).then(res=>{
        cases.value=res.object.records;
        totalpage.value=res.object.total;
      })
    }
    //筛选已读状态投诉反馈
    let selectRead =(currentpage,pagesize)=>{
      selectread(1,pagesize.value).then(res=>{
        cases.value=res.object.records;
        totalpage.value=res.object.total;
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
    const filterread = () => {
      if(checked.value[1]==true & checked.value[0]!=true){
        screen.value ='isread';
        selectIsread(1,pagesize.value);
      }else if(checked.value[0]==true & checked.value[1]!=true){
        screen.value ='read';
        selectRead(1,pagesize.value);
      }else{
        screen.value ='no';
        searchComlains(1,20);
      }
    }
//重置状态
    const reset=()=>{
      checked.value=[false,false];
      screen.value ='no';
      searchComlains(1,20);
    }
    //修改未读状态为已读
    const change =(index,complainId)=>{
      changecomplain({complainId:complainId}).then(()=>{
        cases.value[index].isread=1;
      });
    }
    //监听日期选择
    watch(month,()=>{
      if(month.value!=null){
        screen.value ='choicemonth';
        selectMonth(1,pagesize.value,month.value);
      }else{
        screen.value ='no';
        searchComlains(1,20);
      }

    })
    //禁用未来的日期
    const disabledDate=(time)=>{
      return time.getTime() > Date.now()
    }
    //日期格式化
    const dateFormat =(row,column)=>{
      let date =row[column.property];
      if(date === undefined){
        return ''
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    }
    return {
      typeColor,
      filterTag,
      cases,
      filterread,
      reset,
      change,
      totalpage,
      month,
      changepage,
      changesize,
      disabledDate,
      dateFormat,
      checked
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
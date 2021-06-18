<template>
  <search-box id="sear" @search="searchId"></search-box>
  <div class="con" id="tz">
    <div>
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
      <el-button @click="clearFilter">清除类型过滤器</el-button>
    </div>
    <div class="selectdate">
      <el-date-picker
          v-model="month"
          type="month"
          :disabled-date="disabledDate"
          size="large"
          style="width: 140px;margin-right: 5px"
          placeholder="选择月">
      </el-date-picker>
      <el-date-picker
          v-model="day"
          type="date"
          size="large"
          style="width: 140px;margin-left: 5px"
          placeholder="选择日期"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
      >
      </el-date-picker>
    </div>
  </div>
    <el-table
        :data="orderlist"
        ref="filterTable"
        style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单编号">
              <span>{{ props.row.orderId }}</span>
            </el-form-item>
            <el-form-item label="下单人 ID">
              <span>{{ props.row.publisherId }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{ props.row.publisherContact }}</span>
            </el-form-item>
            <el-form-item label="创建时间" :formatter="dateFormat">
              <span>{{ moment(props.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </el-form-item>
            <el-form-item label="接单人 ID">
              <span>{{ props.row.receiverId }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{ props.row.receiverContact }}</span>
            </el-form-item>
            <el-form-item label="订单价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="接收时间">
              <span>{{ moment(props.row.receiveTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </el-form-item>
            <el-form-item label="完成时间" :formatter="dateFormat">
              <span>{{ moment(props.row.finishedTIme).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </el-form-item>
            <el-form-item label="取货地址">
              <span>{{ props.row.takeAddress }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.sendAddress }}</span>
            </el-form-item>
            <el-form-item label="订单备注">
              <span>{{ props.row.orderNote }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="日期"
          sortable
          width="180"
          column-key="date"
          :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
          prop="orderCategoryId"
          label="订单类型"
          width="100"
          :filters="[
            { text: '外卖', value: 1 },
            { text: '快递', value: 2 },
            { text: '打包', value: 3 },
            { text: '打印', value: 4 },
            { text: '帮带', value: 5 },
            { text: '其他', value: 6 }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template #default="scope">
          <el-tag
              :type="typeColor(scope.row.orderCategoryId)"
              disable-transitions>{{type(scope.row.orderCategoryId)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          width="200"
          label="订单 ID"
          prop="orderId">
      </el-table-column>
      <el-table-column
          :show-overflow-tooltip="true"
          label="订单描述"
          prop="orderNote">
      </el-table-column>
      <el-table-column
          label="下单人 ID"
          prop="publisherId">
      </el-table-column>
      <el-table-column
          label="接单人 ID"
          prop="receiverId">
      </el-table-column>
      <el-table-column
          label="订单价格"
          prop="price">
      </el-table-column>
      <el-table-column
          label="订单状态"
          prop="orderStatus">
        <template v-slot="scope">
          <span>{{Status(scope.row.orderStatus)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <PaginationBox :totalpage="totalpage" @page="changepage" @size="changesize"></PaginationBox>
</template>

<script>
import SearchBox from '@/components/content/SearchBox';
import PaginationBox from '@/components/content/PaginationBox';
import { ref, onMounted, watch} from 'vue';
import { allorders ,dateorders ,searchbyorderid  } from 'network/Orderlist.js';
import {ElMessage} from "element-plus";
import moment from "moment";
import useMove from "utils/UserMove.js";
export default {
  name: "OrderList",
  components:{
    SearchBox,
    PaginationBox
  },
  setup() {
    let orderlist =ref();
    let totalpage =ref();       //总页数
    let pagesize =ref(20); //每一页数量
    let screen =ref();  //记录筛选类型
    let month =ref();
    let day =ref();
    let allOrders =(currentpage,pagesize)=>{
      allorders(currentpage,pagesize).then(res =>{
        orderlist.value=res.object.records;
        totalpage.value=res.object.total;
      });
    }
    let dateOrders = (currentpage,pagesize,time)=>{
      time =moment(time).format("YYYY-MM-DD")
      dateorders(currentpage,pagesize,time).then(res =>{
        orderlist.value=[];
        orderlist.value=res.object.records;
        totalpage.value=res.object.total;
      });
    }
    onMounted(()=>{
      screen.value ='no';
      allOrders(1,20);
      const el = document.getElementById("tz");
      useMove(el);
    })
    watch(month,()=>{
      screen.value ='month';
      if(month.value!='')
      dateOrders(1,pagesize.value,month.value);
    })
    watch(day,()=>{
      screen.value ='day';
      if(day.value!='')
      dateOrders(1,pagesize.value,day.value);
    })
    //切换页数和单页数量
    const changepage =(data)=>{
      if(screen.value=='no'){
        allOrders(data,pagesize.value);
      }else if(screen.value=='month'){
        dateOrders(data,pagesize.value,month.value);
      }else if(screen.value=='day'){
        dateOrders(data,pagesize.value,day.value);
      }
    }
    const changesize =(data)=>{
      if(screen.value=='no'){
        allOrders(1,data);
      }else if(screen.value=='month'){
        dateOrders(1,data,month.value);
      }else if(screen.value=='day'){
        dateOrders(1,data,day.value);
      }
    }
    const filterTable =ref(null);
    //清除筛选
    const resetDateFilter = () => {
      day.value ='';
      month.value='';
      screen.value ='no';
      allOrders(1,20);
    }
    const clearFilter = () => {
      filterTable.value.clearFilter();
    }
    //订单状态
    const Status = (type) => {
      switch (type) {
        case 0:
          return '未接单';
        case 1 :
          return '已接单';
        case 2 :
          return '已完成';
        case 3 :
          return '已评价';
        case 4 :
          return '无效订单';
      }
    }
    //订单类别筛选
    const type =(id) => {
      switch (id) {
        case 1:
          return '外卖';
        case 2 :
          return '快递';
        case 3 :
          return '打包';
        case 4 :
          return '打印';
        case 5 :
          return '帮带';
        case 6 :
          return '其他';
      }
    }
    const typeColor = (type) => {
      switch (type) {
        case 1:
          return 'primary';
        case 2 :
          return 'success';
        case 3 :
          return 'warning';
        case 4 :
          return 'danger';
        case 5 :
          return 'info';
        case 6 :
          return 'info';
      }
    }
    const filterTag = (value, row) => {
      return row.orderCategoryId === value;
    }
    //禁用未来的日期
    const disabledDate=(time)=>{
      return time.getTime() > Date.now()
    }
    const shortcuts=[{
      text: 'Today',
      value: new Date(),
    }, {
      text: 'Yesterday',
      value: (() => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      })(),
    }, {
      text: 'A week ago',
      value: (() => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      })(),
    }]

    const searchId=(data)=>{
      if(data!=''){
        searchbyorderid(data).then(res =>{
          orderlist.value=[];
          orderlist.value.push(res.object);
          ElMessage.success({
            message: '查询成功！',
            type: 'warning'
          });
        }).catch(() =>{
          ElMessage.success({
            message: '查询失败！请重新输入',
            type: 'warning'
          });
        });
      }else{
        screen.value ='no';
        allOrders(1,20);
      }

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
      resetDateFilter,
      clearFilter,
      filterTag,
      filterTable,
      month,
      day,
      changepage,
      changesize,
      disabledDate,
      shortcuts,
      Status,
      type,
      searchId,
      orderlist,
      dateFormat,
      moment,
      totalpage
    }

  }
}
</script>

<style>
.con{
  position: fixed;
  z-index: 5;
  width: 290px;
  height: 110px;
  border-radius: 5px;
  background-color: #FFFFFF;
}
#sear{
  margin-bottom: 20px;
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
</style>
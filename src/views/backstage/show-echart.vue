<template>
  <div class="wrapper">
    <div class="container">
      <el-tooltip :content="'视图: ' + value1" placement="top">
        <el-switch
            v-model="value1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="堆叠折线图"
            inactive-value="柱状图"
        >
        </el-switch>
      </el-tooltip>
      <LineChart :OrdernumsData="OrderweekData" :times="week" class="chart" v-show="value1=='堆叠折线图'"/>
      <BarChart :OrdernumsData="OrderweekData" :times="week" class="chart" v-show="value1!='堆叠折线图'" />
    </div>
    <DoughnutChart :OrdernumsData="OrderweekData" :times="week" class="chart" />
    <div class="container">
      <el-tooltip :content="'视图: ' + value2" placement="top">
        <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="堆叠折线图"
            inactive-value="柱状图"
        >
        </el-switch>
      </el-tooltip>
      <LineChart :OrdernumsData="OrdermonthData"  :times="month" class="chart" v-show="value2=='堆叠折线图'"/>
      <BarChart :OrdernumsData="OrdermonthData"  :times="month" class="chart" v-show="value2!='堆叠折线图'" />
    </div>
    <DoughnutChart :OrdernumsData="OrdermonthData" :times="month" class="chart" />
  </div>
</template>

<script>
import {onMounted, ref } from "vue";
import LineChart from '@/components/echarts/LineChart';
import DoughnutChart from '@/components/echarts/DoughnutChart';
import BarChart from '@/components/echarts/BarChart';
export default {
  name: "show-echart",
  components:{
    LineChart,
    DoughnutChart,
    BarChart
  },
  setup(){
    let value1 =ref('堆叠折线图');
    let value2 =ref('柱状图');
    const OrderweekData = ref([]);
    const OrdermonthData = ref([]);
    const week='周';
    const month='月';
    const fetchweekData = async () => {
      const res = await fetch("/OrdersTypeW.json");
      const data = await res.json();
      OrderweekData.value =data;
    };
    const fetchmonthData = async () => {
      const res = await fetch("/OrdersTypeM.json");
      const data = await res.json();
      OrdermonthData.value =data;
    };

    onMounted( () => {
      fetchweekData ();
      fetchmonthData();
    });
    return{
      value1,
      value2,
      OrderweekData,
      OrdermonthData,
      week,
      month
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


.wrapper {
  height: 100%;
  display: grid;
  grid-template-columns:auto auto;
  background-color: #E9EEF3;
  position: relative;
  /*background: hsl(210, 20%, 10%);*/
  /*display: flex;*/
  /*justify-content: space-between;*/
}
.wrapper .chart {
  width: 800px;
  height: 400px;
  padding: 10px;
  margin-bottom: 20px;
}
.chart{
  background-color: #ffffff;
}
.container{
  position: relative;
  width: 100%;
}
.el-switch{
  position: absolute;
  z-index: 1;
  right: 145px;
  top: 15px;
}
</style>
<template>
    <Echarts :options="options" :class="$attrs.class"/>
</template>

<script>
import Echarts from "./Echarts.vue";
import barChartOptionCreator from "@/utils/charts/barChart";
import {toRefs, computed } from "vue";
export default {
  name: "BarChart",
  components:{
    Echarts
  },
  props:{
    OrdernumsData:{
      type:Array,
      default:function (){
        return [];
      }
    },
    times:{
      type:String,
      default:function (){
        return '';
      }
    }
  },
  setup(props){
    const { OrdernumsData, times } = toRefs(props);
    function populateMovieData(rawData) {
      let names = [];
      let Ordernums = [];
      rawData.forEach((movie) => {
        names.push(movie?.name);
        Ordernums.push(movie?.nums);
      });
      return {names, Ordernums};
    }
    const options =computed(() => {
      if(OrdernumsData !=undefined){
        const { names, Ordernums } = populateMovieData(OrdernumsData.value);
        const time ={time:times.value,fate:times.value=='月'?30:7};
        return barChartOptionCreator(names, Ordernums,time);
      }else{
        return null;
      }
    })
    return{
      options
    }
  }
}
</script>

<style scoped>

</style>
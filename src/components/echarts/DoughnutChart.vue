<template>
  <Echarts :options="options" :class="$attrs.class" v-if="options"/>
</template>

<script>
import Echarts from "./Echarts.vue";
import {computed, toRefs} from "vue";
import doughnutChartOptionCreator from "@/utils/charts/doughnutChart";
export default {
  name: "DoughnutChart",
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
    const { OrdernumsData,times } = toRefs(props);
    function populateMovieData(rawData) {
      let Typelist =[];
      rawData.forEach((movie) => {
        Typelist.push({
          name:movie?.name,
          value:(movie?.nums).reduce((temp,item)=>{
            return temp+item;
        }),
        })
      });
      return { Typelist };
    }
    const options =computed(() => {
      if(OrdernumsData !=undefined){
        const { Typelist } = populateMovieData(OrdernumsData.value);
        return doughnutChartOptionCreator(Typelist,times.value);
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
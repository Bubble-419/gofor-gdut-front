<template>
  <div class="container" ref="container"></div>
</template>

<script>
import { ref, onMounted, toRefs, watch } from "vue";
import * as echarts from "echarts";
import ChartTheme from '@/assets/theme/ChartTheme'
export default {
  name: "Echarts",
  props:{
    options: {
      type: Object,
      default: function () {
        return {}
      },
      required: true,
    }
  },
  setup(props){
    const container = ref(null);
    const chart = ref(null);
    const { options } = toRefs(props);
    onMounted(() => {
      chart.value = echarts.init(container.value,ChartTheme);
      chart.value.setOption(props.options);
    });
    watch(
        options,
        (newOptions) => {
          chart.value.setOption(newOptions);
        },
        { deep: true }
    );
    return{
      ...toRefs(props),
      chart,
      container
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
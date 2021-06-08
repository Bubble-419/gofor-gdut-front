<template>
  <div class="recommend">
    <p>test</p>
    <order-list :orderList="recommendOrderList"></order-list>
  </div>
</template>

<script>
import OrderList from "components/content/OrderList";
import { getHomeRecommendList } from "network/home.js";
import { ref, onMounted } from "vue";

export default {
  name: "HomeRecommend",
  components: {
    OrderList,
  },
  setup() {
    const recommendOrderList = ref([]);

    onMounted(() => {
      getHomeRecommendList().then((res) => {
        recommendOrderList.value = res.orderList.data;
      });
    });

    return {
      recommendOrderList,
    };
  },
};
</script>

<style scoped>
.recommend {
  margin-top: 120px;
}
</style>
<template>
  <div id="my-published">
    <order-list :orderList="orderList"></order-list>
  </div>
</template>

<script>
import OrderList from "components/content/OrderList";
import { onMounted, reactive, toRefs } from "vue";
import { publishedOrders } from "network/order.js";
export default {
  name: "MyPublished",
  components: {
    OrderList,
  },
  setup() {
    // TO-DO 分页
    const state = reactive({
      orderList: [],
    });
    onMounted(() => {
      publishedOrders().then((res) => {
        state.orderList = res.object;
      });
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
</style>
<template>
  <div id="my-received">
    <order-list :orderList="orderList"></order-list>
  </div>
</template>

<script>
import OrderList from "components/content/OrderList";
import { onMounted, reactive, toRefs } from "vue";
import { receivedOrders } from "network/order.js";
export default {
  name: "Myreceived",
  components: {
    OrderList,
  },
  setup() {
    // TO-DO 分页
    const state = reactive({
      orderList: [],
    });
    onMounted(() => {
      receivedOrders().then((res) => {
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
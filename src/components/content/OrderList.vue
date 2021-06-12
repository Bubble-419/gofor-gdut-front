<template>
  <div id="order-list">
    <order
      class="order"
      v-for="order in orderList"
      :key="order.orderId"
      :order="order"
      :publisherId="order.publisherId"
    ></order>
  </div>
</template>

<script>
import { reactive } from "vue";
import Order from "./Order.vue";
export default {
  name: "OrderList",
  components: {
    Order,
  },
  props: {
    orderList: {
      type: Array,
      default: function () {
        return [];
      },
      // required: true,
    },
  },
  setup() {
    const state = reactive({
      
    });
    return {
      state,
    };
  },
};
</script>

<style scoped>
.order {
  margin-bottom: 30px;
}
</style>
<template>
  <el-scrollbar :height="height">
    <order-list :orderList="orderList"></order-list>
    <div class="pagination">
      <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          :hide-on-single-page="true"
          @current-change="changePage"
      >
      </el-pagination>
    </div>
  </el-scrollbar>
</template>

<script>
import OrderList from "components/content/OrderList";

export default {
  name: "OrderPage",
  components: {
    OrderList,
  },
  props: {
    orderList: {
      type: Array,
      default: function () {
        return [];
      },
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    height: {
      type: String,
      default: "600px",
    }
  },
  emits: ["change-page"],
  setup(props, {emit}) {
    const changePage = (val) => {
      emit("change-page", val);
    };
    return {changePage};
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}
</style>
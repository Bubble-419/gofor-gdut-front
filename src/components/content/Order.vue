<template>
  <el-card
    id="order-box"
    @click="
      this.$router.push({ name: 'Detail', params: { orderId: order.orderId } })
    "
  >
    <el-space :size="20" class="publisher-info">
      <el-avatar size="large" :src="publisher.publisherIcon"></el-avatar>
      <span>{{ publisher.publishername }}</span>
    </el-space>
    <el-card shadow="never" class="order">
      <template #header>
        <div class="order-header">
          <div>
            <el-tag>已接单</el-tag>
            <span class="order-category">代拿快递</span>
          </div>
          <h3 class="price">￥{{ order.price }}</h3>
        </div>
      </template>
      <div class="order-body">
        <el-space direction="vertical" :size="15">
          <div>取件地址：{{ order.takeAddress }}</div>
          <div>收件地址：{{ order.sendAddress }}</div>
          <div>{{ order.orderNote }}</div>
        </el-space>
      </div>
    </el-card>
  </el-card>
</template>

<script>
import { getUserInfoById } from "network/user.js";
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "Order",
  props: {
    // publisherName: {
    //   type: String,
    //   default: "胖可丁",
    //   required
    // },
    // publisherIcon: {
    //   type: String,
    //   default:
    //     "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    // },
    publisherId: {
      type: Number,
      default: 0,
      // required: true,
    },
    order: {
      type: Object,
      default: function () {
        return {};
      },
      // required: true,
    },
  },
  setup(props) {
    const state = reactive({
      publisher: {
        publisherName: "",
        publisherIcon: "",
      },
    });
    onMounted(() => {
      getUserInfoById(props.order.publisherId).then((res) => {
        state.publisher.publisherName = res.object.userName;
        state.publisher.publisherIcon = res.object.userIcon;
      });
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
#order-box {
  padding: 5px 20px;
  cursor: pointer;
}

.publisher-info {
  margin: 5px 10px;
}

.order {
  padding: 0 25px;
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price {
  font-size: 1.5em;
  color: var(--price-color);
}

.order-category {
  margin-left: 18px;
  color: var(--font-title-color);
}
</style>
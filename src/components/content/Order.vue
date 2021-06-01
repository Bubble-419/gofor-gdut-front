<template>
  <el-card class="order-box">
    <el-space :size="20" class="user-info">
      <el-avatar size="large" :src="userIcon"></el-avatar>
      <span>{{ username }}</span>
    </el-space>
    <el-card shadow="never" class="order">
      <template #header>
        <div class="order-header">
          <div>
            <el-tag>已接单</el-tag>
            <span>代拿快递</span>
          </div>
          <h3 class="price">{{ order.price }}</h3>
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
export default {
  name: "Order",
  props: {
    userName: {
      type: String,
      default: "胖可丁",
    },
    userIcon: {
      type: String,
      default:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    },
    order: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.order-box {
  padding: 5px 20px;
}

.user-info {
  margin: 5px 10px;
}

.order {
  background-color: var(--bg-color);
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
</style>
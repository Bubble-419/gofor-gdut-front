<template>
  <div id="update-order">
    <my-header></my-header>
    <el-form
        :model="orderForm"
        ref="orderInfo"
        :rules="rules"
        class="w update-order"
    >
      <el-form-item prop="publisherContact" label="手机号码(仅对接单人可见)">
        <el-input
            v-model.number="orderForm.publisherContact"
            :placeholder="orderForm.publisherContact"
        ></el-input>
      </el-form-item>
      <el-form-item prop="orderCategoryId" label="派单类型">
        <el-select v-model="orderForm.orderCategoryId" placeholder="请选择">
          <el-option
              v-for="c in orderCategory"
              :key="c.id"
              :label="c.name"
              :value="c.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="takeAddress" label="取货地址">
        <el-input
            v-model="orderForm.takeAddress"
            :placeholder="orderForm.takeAddress"
        ></el-input>
      </el-form-item>
      <el-form-item prop="sendAddress" label="送货地址">
        <el-input
            v-model="orderForm.sendAddress"
            :placeholder="orderForm.sendAddress"
        ></el-input>
      </el-form-item>
      <el-form-item prop="orderNote" label="备注">
        <el-input
            type="textarea"
            :rows="3"
            v-model="orderForm.orderNote"
            :placeholder="orderForm.orderNote"
        ></el-input>
      </el-form-item>
      <el-form-item prop="price" label="价格">
        <el-input v-model.number="orderForm.price">
          <template #append>元</template>
        </el-input>
      </el-form-item>
      <div class="btns">
        <el-form-item>
          <el-button type="primary" @click="onUpdate">修改订单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onCancel">取消订单</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyHeader from "components/content/MyHeader";
import {useStore} from "vuex";
import {reactive, ref, toRefs} from "vue";
import {checkPhone} from "@/utils/formRules.js";
import {updateOrder, cancelOrder, getDetail} from "network/order.js";
import {useRoute, useRouter} from "vue-router";

export default {
  name: "PublishOrder",
  components: {MyHeader},
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      orderCategory: store.state.orderCategory,
      orderForm: {},
      rules: {
        publisherContact: [{validator: checkPhone, trigger: "blur"}],
        takeAddress: [
          {required: true, message: "取货地址不能为空", trigger: "blur"},
        ],
        sendAddress: [
          {required: true, message: "送货地址不能为空", trigger: "blur"},
        ],
        price: [
          {required: true, message: "价格不能为空", trigger: "blur"},
          {type: "number", message: "请输入正确的数字"},
          {min: 0, message: "价格不能低于0元", trigger: "blur"},
        ],
      },
    });
    console.log("route.params.orderId:" + route.params.orderId);
    getDetail(route.params.orderId).then((res) => {
      console.log("res.object:" + res.object)
      state.orderForm = res.object;
      console.log("state.orderForm:" + state.orderForm)
    });
    const orderInfo = ref(null);
    const onUpdate = () => {
      orderInfo.value.validate((valid) => {
        if (valid) {
          orderInfo.value = state.orderForm;
          updateOrder(orderInfo.value).then((res) => {
            if (res.status == "200") {
              setTimeout(() => {
                router.push({name: "Home"});
              }, 1000);
            }
          });
        }
      });
    };
    const onCancel = () => {
      cancelOrder({orderId: state.orderForm.orderId});
    };
    // onMounted(() => {
    //
    // });
    return {
      ...toRefs(state),
      store,
      orderInfo,
      onUpdate,
      onCancel,
    };
  },
};
</script>

<style scoped>
.update-order {
  box-sizing: border-box;
  padding: 60px 200px;
  font-weight: 700;
  font-size: 1.1em;
}

.btns {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}
</style>
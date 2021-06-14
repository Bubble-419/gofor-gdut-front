<template>
  <div class="captcha" @click="getOrRefresh">
    <img :src="captchaSrc" alt="" />
  </div>
</template>

<script>
import { getCaptcha } from "network/user.js";
import { onMounted, reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      captchaSrc: "",
    });
    const getOrRefresh = () => {
      getCaptcha().then((res) => {
        state.captchaSrc = res.object;
      });
    };
    onMounted(() => {
      getOrRefresh();
    });
    return {
      ...toRefs(state),
      getOrRefresh,
    };
  },
};
</script>

<style scoped>
.captcha {
  width: 90px;
  height: 40px;
}

.captcha img {
  object-fit: cover;
}
</style>
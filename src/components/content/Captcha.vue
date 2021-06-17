<template>
  <div class="captcha" @click="getOrRefresh">
    <img :src="captchaSrc" alt="" />
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      captchaSrc: '/captcha?time='+new Date(),
    });
    const getOrRefresh = () => {
      state.captchaSrc = '/captcha?time='+new Date();
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
  cursor: pointer;
  width: 100px;
  height: 40px;
  z-index: 100;
}

.captcha img {
  object-fit: cover;
}
</style>
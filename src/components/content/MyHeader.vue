<template>
  <header>
    <div class="logo"><img src="~assets/images/logo.png" alt="" /></div>
    <div class="search">
      <input
        type="search"
        placeholder="Search..."
        class="search"
        v-model="keywords"
        @keyup.enter="search"
      />
    </div>
    <button class="login">登录/注册</button>
  </header>
</template>

<script>
import { ref } from "vue";
import { searchByKeywords } from "network/header.js";
export default {
  name: "MyHeader",
  setup() {
    const keywords = ref("");
    const search = () => {
      searchByKeywords(keywords);
    };
    return {
      keywords,
      search,
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: var(--font-color);
  z-index: 100;
}

.logo {
  height: 42px;
  line-height: 42px;
}

.login {
  width: 180px;
  height: 30px;
}

.search {
  position: relative;
}

.search input {
  width: 25px;
  height: 25px;
  padding: 10px;
  border: solid 3px var(--theme-medium-green);
  background: transparent;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.5s;
}

.search::after {
  content: "";
  position: absolute;
  bottom: 19px;
  right: -4px;
  width: 3px;
  height: 15px;
  background: var(--theme-medium-green);
  transform: rotate(135deg);
}

.search input:focus {
  width: 200px;
  padding: 18px;
  cursor: default;
}
</style>
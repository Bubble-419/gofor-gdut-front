<template>
  <div>
    <home></home>
  </div>
</template>

<script>
import Home from "./views/home/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
@import "assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<template>
  <div id="app">
    <Nav :key="$route.fullPath"/>
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/NavLink";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
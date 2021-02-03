<template>
  <div id="app">
    <header>
      <h1>OPLASK</h1>
      <router-link v-if="homeView" to="/favorites"
        ><base-button>Favorites</base-button></router-link
      >
      <router-link v-else to="/"><base-button>Home</base-button></router-link>
    </header>
    <router-view />
  </div>
</template>
<script>
// import {  } from "module";
export default {
  computed: {
    homeView() {
      return this.$route.path === "/";
    },
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-size: 62.5%;
  background-color: rgb(243, 243, 243);
}
#app {
  margin: 0 auto;
  max-width: 80%;
  min-height: 100vh;
  padding: 2rem;
  background-color: white;
  header {
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 2rem;
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
  p {
    font-size: 1.6rem;
  }
}
</style>

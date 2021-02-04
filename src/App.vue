<template>
  <div id="app">
    <header>
      <router-link to="/">
        <h1>OPLASK</h1>
      </router-link>

      <router-link v-if="homeView" to="/favorite"
        ><base-button>Favorites</base-button></router-link
      >
      <router-link v-else to="/"><base-button>Home</base-button></router-link>
    </header>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    homeView() {
      return this.$route.path === "/";
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap");
$ipad-cutoff: 770px;
$mobile-cutoff: 542px;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-color: #000;
}
body {
  font-size: 62.5%;
  background-color: rgb(243, 243, 243);
  font-family: "Roboto", sans-serif;
}
#app {
  margin: 0 auto;
  max-width: 80%;
  min-height: 100vh;
  padding: 2rem;
  background-color: white;

  @media screen and (max-width: $ipad-cutoff) {
    max-width: 100%;
    padding: 1rem;
  }

  header {
    background-color: #f8f8f8;
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;

    @media screen and (max-width: $ipad-cutoff) {
      margin: 0 0 2rem;
    }

    h1 {
      font-size: 2rem;
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
}
</style>

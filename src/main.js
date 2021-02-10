import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BaseButton from "@/components/BaseButton";
import store from './store'

Vue.config.productionTip = false;
Vue.component("BaseButton", BaseButton);

new Vue({
  data() {
    return {
      // currentSearchResults: [],
      // searchTotalPages: 1,
      // searchPage: 1,
      // isLoading: false,
      // page: 1,
      // totalPages: 1,
      // searchPhrase: "",
    };
  },

  router,
  store,
  render: (h) => h(App)
}).$mount("#app");

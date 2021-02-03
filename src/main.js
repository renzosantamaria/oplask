import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BaseButton from "@/components/BaseButton";

Vue.config.productionTip = false;
Vue.component("BaseButton", BaseButton);

new Vue({
  data() {
    return {
      isLoading: false,
      page: 1,
      totalPages: 0,
      searchPhrase: "",
    };
  },
  router,
  render: (h) => h(App),
}).$mount("#app");

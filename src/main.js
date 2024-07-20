import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/input.css";
import BaseCard from "./components/base/BaseCard.vue";
import BaseButton from "./components/base/BaseButton.vue";

createApp(App)
  .use(store)
  .use(router)
  .component("BaseCard", BaseCard)
  .component("BaseButton", BaseButton)
  .mount("#app");

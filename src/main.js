import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./input.css";
import PrimeVue from "primevue/config";
import Lara from "./presets/lara";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, {
    unstyled: true,
    pt: Lara,
  })
  .mount("#app");

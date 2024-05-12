import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isMobileMenuActive: false,
    };
  },
  getters: {},
  mutations: {
    showMobileMenu(state) {
      state.isMobileMenuActive = !state.isMobileMenuActive;
    },
  },
  actions: {},
  modules: {},
});

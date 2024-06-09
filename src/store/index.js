import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isMobileMenuActive: false,
    };
  },
  getters: {},
  mutations: {
    toggleMobileMenu(state) {
      state.isMobileMenuActive = !state.isMobileMenuActive;
    },
    hideMobileMenu(state) {
      state.isMobileMenuActive = false;
    },
  },
  actions: {},
  modules: {},
});

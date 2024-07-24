import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      isMobileMenuActive: false,
      venues: [],
      apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    };
  },
  getters: {
    venuesList(state) {
      return state.venues;
    },
  },
  mutations: {
    toggleMobileMenu(state) {
      state.isMobileMenuActive = !state.isMobileMenuActive;
    },
    hideMobileMenu(state) {
      state.isMobileMenuActive = false;
    },
    setVenues(state, venues) {
      if (!state.venues) return;
      state.venues = venues;
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get(
          "https://bratislavska-pivaren-9bfe5-default-rtdb.europe-west1.firebasedatabase.app/venues.json"
        );
        const venues = response.data ? Object.values(response.data) : null;
        commit("setVenues", venues);
        console.log(JSON.parse(JSON.stringify(venues)));
      } catch (err) {
        console.error("Error fetching venues: ", err);
      }
    },
  },
  modules: {},
});

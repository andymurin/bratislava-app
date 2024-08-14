import { createStore } from "vuex";
import axios from "axios";

let timer;

export default createStore({
  state() {
    return {
      isMobileMenuActive: false,
      venues: [],
      apiKey: "AIzaSyAqJ49UDjdlgbIxpXTl-_x6Waok8yZ3VAM",
      auth: {
        userId: null,
        token: null,
      },
      didAutoLogout: false,
    };
  },
  getters: {
    venuesList(state) {
      return state.venues;
    },
    userId(state) {
      return state.auth.userId;
    },
    token(state) {
      return state.auth.token;
    },
    isAuthenticated(state) {
      return !!state.auth.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
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
    setUser(state, payload) {
      state.auth.token = payload.token;
      state.auth.userId = payload.userId;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
  },
  actions: {
    async fetchData({ commit, getters }) {
      const token = getters.token;
      const userId = getters.userId;

      if (!token || !userId) {
        console.error("User not authenticated");
        return;
      }

      try {
        const response = await axios.get(
          `https://bratislavska-pivaren-9bfe5-default-rtdb.europe-west1.firebasedatabase.app/venues/${userId}.json?auth=${token}`
        );
        const venues = response.data ? Object.values(response.data) : [];
        commit("setVenues", venues);
        console.log("Fetched venues:", JSON.stringify(venues));
      } catch (err) {
        console.error("Error fetching venues: ", err);
        if (err.response && err.response.status === 401) {
          dispatch("logout");
        }
      }
    },
    logout(context) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");

      clearTimeout(timer);

      context.commit("setUser", {
        token: null,
        userId: null,
      });
    },

    async auth(context, payload) {
      const mode = payload.mode;
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${context.state.apiKey}`;
      if (mode === "signup") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${context.state.apiKey}`;
      }
      try {
        const body = {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        };

        const response = await axios.post(url, body);

        if (response.status !== 200) {
          const error = new Error(
            response.message || "Failed to authenticate, try again later."
          );
          throw error;
        }

        const expiresIn = +response.data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("tokenExpiration", expirationDate);

        timer = setTimeout(() => {
          context.dispatch("autoLogout");
        }, expiresIn);

        context.commit("setUser", {
          token: response.data.idToken,
          userId: response.data.localId,
        });
      } catch (error) {
        const errorMessage =
          error.response?.data?.error?.message ||
          "Failed to login. Please try again.";
        throw new Error(errorMessage);
      }
    },

    async login(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },

    autoLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 20000) {
        return;
      }

      timer = setTimeout(() => {
        context.dispatch("autoLogout");
      }, expiresIn);

      if (token && userId) {
        context.commit("setUser", {
          token: token,
          userId: userId,
        });
      }
    },

    autoLogout(context) {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    },

    async signup(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },
  },
});

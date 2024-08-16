import { createStore } from "vuex";
import axios from "axios";

const API_KEY = "AIzaSyAqJ49UDjdlgbIxpXTl-_x6Waok8yZ3VAM";
const AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const DB_URL =
  "https://bratislavska-pivaren-9bfe5-default-rtdb.europe-west1.firebasedatabase.app/venues/";

let autoLogoutTimer;

export default createStore({
  state() {
    return {
      isMobileMenuActive: false,
      venues: [],
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
    hasVenues(state) {
      return state.venues.length > 0;
    },
    venueTypes(state) {
      return [
        ...new Set(
          state.venues.map(function (venue) {
            return venue.type
              .split("_")
              .map(function (word) {
                return (
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
              })
              .join(" ");
          })
        ),
      ];
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
    async fetchData(context) {
      const token = context.getters.token;
      const userId = context.getters.userId;

      if (!token || !userId) {
        console.error("User not authenticated");
        return;
      }

      try {
        const response = await axios.get(
          `${DB_URL}${userId}.json?auth=${token}`
        );
        const venues = response.data ? Object.values(response.data) : [];
        context.commit("setVenues", venues);
        console.log("Fetched venues:", JSON.stringify(venues));
      } catch (err) {
        console.error("Error fetching venues: ", err);
        if (err.response && err.response.status === 401) {
          context.dispatch("logout");
        }
      }
    },
    logout(context) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      clearTimeout(autoLogoutTimer);
      context.commit("setUser", { token: null, userId: null });
    },
    async auth(context, payload) {
      const mode = payload.mode;
      const url = `${AUTH_URL}${
        mode === "signup" ? "signUp" : "signInWithPassword"
      }?key=${API_KEY}`;
      try {
        const response = await axios.post(url, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        const expiresIn = +response.data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("tokenExpiration", expirationDate);

        autoLogoutTimer = setTimeout(function () {
          context.dispatch("autoLogout");
        }, expiresIn);

        context.commit("setUser", {
          token: response.data.idToken,
          userId: response.data.localId,
        });
      } catch (error) {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message
            ? error.response.data.error.message
            : "Failed to authenticate. Please try again.";
        throw new Error(errorMessage);
      }
    },
    login(context, payload) {
      return context.dispatch("auth", { ...payload, mode: "login" });
    },
    signup(context, payload) {
      return context.dispatch("auth", { ...payload, mode: "signup" });
    },
    autoLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 20000) {
        return;
      }

      autoLogoutTimer = setTimeout(function () {
        context.dispatch("autoLogout");
      }, expiresIn);

      if (token && userId) {
        context.commit("setUser", { token: token, userId: userId });
      }
    },
    autoLogout(context) {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    },
  },
});

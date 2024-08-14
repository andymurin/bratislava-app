<template>
  <div
    class="absolute bg-gradient-to-l top-28 from-amber-400 to-amber-600 w-full left-0"
    @click="toggleMobileMenu"
  >
    <NavigationItem pathName="addVenue" label="Find venue" :mobile="true" />
    <NavigationItem
      pathName="venuesView"
      label="Favourite venues"
      :mobile="true"
    />
    <NavigationItem
      pathName="auth"
      label="Login / Signup"
      :mobile="true"
      v-if="!isLoggedIn"
    />
    <NavigationItem
      pathName="auth"
      label="Logout"
      :mobile="true"
      v-else
      @click="logout"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NavigationItem from "./NavigationItem.vue";
export default {
  components: { NavigationItem },
  methods: {
    toggleMobileMenu() {
      this.$store.commit("toggleMobileMenu");
    },
    ...mapActions(["logout"]),
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

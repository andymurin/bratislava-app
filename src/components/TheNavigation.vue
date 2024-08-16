<template>
  <nav
    class="sticky flex top-0 bg-gradient-to-r from-amber-400 to-amber-600"
    role="navigation"
    aria-label="Main navigation"
  >
    <NavigationLogo @click="hideMobileMenu" />

    <NavigationMobileButton />

    <MobileMenu v-if="isMobileMenuActive" />

    <div class="hidden flex-1 md:flex items-center justify-end">
      <NavigationItem pathName="addVenue" label="Find venue" />
      <NavigationItem
        v-if="isLoggedIn"
        pathName="venuesView"
        label="Favourite venues"
      />
      <NavigationItem
        v-if="!isLoggedIn"
        pathName="auth"
        label="Login / Signup"
      />
      <NavigationItem v-else pathName="auth" label="Logout" @click="logout" />
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import NavigationLogo from "./NavigationLogo.vue";
import NavigationItem from "./NavigationItem.vue";
import NavigationMobileButton from "./NavigationMobileButton.vue";
import MobileMenu from "./MobileMenu.vue";

export default {
  components: {
    NavigationLogo,
    NavigationItem,
    NavigationMobileButton,
    MobileMenu,
  },
  computed: {
    ...mapState(["isMobileMenuActive"]),
    ...mapGetters(["isAuthenticated"]),
    isLoggedIn() {
      return this.isAuthenticated;
    },
  },
  methods: {
    ...mapMutations({
      toggleMobileMenu: "toggleMobileMenu",
      hideMobileMenu: "hideMobileMenu",
    }),
    ...mapActions(["logout"]),
  },
};
</script>

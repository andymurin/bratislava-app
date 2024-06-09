<template>
  <nav class="sticky flex top-0 bg-gradient-to-r from-amber-400 to-amber-600">
    <NavigationLogo @click="hideMobieMenu" />

    <NavigationMobileButton />

    <MobileMenu v-if="isMobileMenuActive" />

    <div class="hidden flex-1 md:flex items-center justify-end">
      <NavigationItem pathName="addVenue" label="Add venue" />
      <NavigationItem pathName="venuesView" label="Venues" />
    </div>
  </nav>
</template>
<script>
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
  methods: {
    toggleMobileMenu() {
      this.$store.commit("toggleMobileMenu");
    },
    hideMobieMenu() {
      this.$store.commit("hideMobileMenu");
    },
  },
  computed: {
    isMobileMenuActive() {
      return this.$store.state.isMobileMenuActive;
    },
  },
};
</script>

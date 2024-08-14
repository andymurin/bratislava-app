<template>
  <TheNavigation />
  <router-view />
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
export default {
  components: {
    TheNavigation,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curr, old) {
      if (curr && curr !== old) {
        this.$router.replace("/auth");
      }
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

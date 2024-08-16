<template>
  <TheNavigation />
  <router-view />
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TheNavigation,
  },
  computed: {
    ...mapGetters(["didAutoLogout"]),
  },
  watch: {
    didAutoLogout(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.$router.replace("/auth");
      }
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

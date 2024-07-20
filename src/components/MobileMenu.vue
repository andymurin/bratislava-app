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
  </div>
</template>

<script>
import NavigationItem from "./NavigationItem.vue";
export default {
  components: { NavigationItem },
  methods: {
    toggleMobileMenu() {
      this.$store.commit("toggleMobileMenu");
    },
  },
};
</script>

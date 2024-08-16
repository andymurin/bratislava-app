<template>
  <div class="block md:hidden ml-auto pr-4 my-auto cursor-pointer">
    <div @click="toggleMobileMenu">
      <div
        class="bg-white top-0 rounded-full w-8 h-1"
        :class="{
          'rotate-45 transition-transform': isMobileMenuActive,
          'rotate-0 transition-transform': !isMobileMenuActive,
        }"
      ></div>
      <div
        class="bg-white rounded-full w-8 h-1 mt-1"
        :class="{
          'opacity-0 transition-opacity': isMobileMenuActive,
          'opacity-100 transition-opacity': !isMobileMenuActive,
        }"
      ></div>
      <div
        class="bg-white top-0 rounded-full w-8 h-1"
        :class="{
          '-rotate-45 -mt-3 transition-transform': isMobileMenuActive,
          'rotate-0 mt-1 transition-transform': !isMobileMenuActive,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  methods: {
    ...mapMutations(["toggleMobileMenu"]),
  },
  computed: {
    ...mapState(["isMobileMenuActive"]),
  },
};
</script>

<template>
  <router-link
    to="/"
    class="flex text-white transition-colors ease-in-out"
    :class="hoverClasses"
  >
    <div class="flex items-center p-2 gap-2">
      <img src="@/assets/logo.svg" alt="logo" width="100" />
      <p class="text-2xl font-bold">
        Bratislavská <br />
        Piváreň
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      isHoverEnabled: true,
    };
  },
  computed: {
    hoverClasses() {
      return this.isHoverEnabled
        ? "hover:text-amber-100 hover:bg-white/10"
        : "";
    },
  },
  mounted() {
    this.checkHoverCapability();
  },
  methods: {
    checkHoverCapability() {
      const isHoverCapable = window.matchMedia("(hover: hover)").matches;
      this.isHoverEnabled = isHoverCapable;
    },
  },
};
</script>

<style scoped>
@media (hover: none) {
  .touch-active {
    @apply bg-amber-600 text-white border-white;
  }
}
</style>

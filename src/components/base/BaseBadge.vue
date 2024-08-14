<template>
  <button
    class="py-1 px-2 border-2 border-black border-solid cursor-pointer rounded-3xl mr-2 bg-white text-xs"
    :class="hoverClasses"
  >
    <slot></slot>
  </button>
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
        ? "hover:bg-amber-600 hover:text-white hover:border-white"
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

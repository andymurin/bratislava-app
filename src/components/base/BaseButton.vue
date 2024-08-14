<template>
  <button
    :class="[
      'bg-white border-black py-3 px-6 border-2 border-solid cursor-pointer rounded-3xl mr-2',
      hoverClasses,
    ]"
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
      return window.matchMedia("(hover: hover)").matches
        ? "hover:bg-amber-600 hover:text-white hover:border-white"
        : "active:bg-amber-600 active:text-white active:border-white";
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
@media (hover: hover) {
  button:hover {
    @apply bg-amber-600 text-white border-white;
  }
}

@media (hover: none) {
  button:active {
    @apply bg-amber-600 text-white border-white;
  }
}
</style>

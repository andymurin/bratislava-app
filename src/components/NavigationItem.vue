<template>
  <router-link
    :to="{ name: pathName }"
    class="'realtive flex h-full cursor-pointer items-center p-4 font-bold text-white hover:text-amber-100 hover:bg-white/10 transition-colors ease-in-out'"
    :class="{
      'justify-center ': mobile,
    }"
    >{{ label }}</router-link
  >
</template>

<script>
export default {
  props: {
    pathName: String,
    label: String,
    mobile: { type: Boolean, default: false },
  },
};
</script>

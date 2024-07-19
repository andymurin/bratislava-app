<template>
  <section class="flex justify-center">
    <h1 class="text-2xl font-semibold mt-10">
      Find your favourite venue
      <router-link to="/add-venue" class="hover:text-amber-600"
        >here</router-link
      >!
    </h1>
  </section>
</template>

<script>
export default {
  components: "addVenue",
};
</script>

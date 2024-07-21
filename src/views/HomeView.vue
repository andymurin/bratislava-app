<template>
  <BaseCard class="flex justify-center">
    <h1 class="text-2xl font-semibold my-5">
      Find your favourite venue
      <router-link to="/add-venue" class="text-amber-600">here</router-link>!
    </h1>
  </BaseCard>
</template>

<script>
export default {
  components: "addVenue",
};
</script>

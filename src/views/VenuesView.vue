<template>
  <ul v-if="venues?.length">
    <li v-for="venue in venues" :key="venue.id">
      <BaseCard>
        <router-link :to="`/venue/${venue.id}`">
          <h2 class="text-lg font-semibold">{{ venue.name }}</h2>
          <p>{{ venue.address }}</p>
        </router-link>
      </BaseCard>
    </li>
    <li>
      <BaseCard
        ><h2 class="text-lg font-semibold">
          Didn't find your favourite venue? Try
          <router-link to="/add-venue" class="text-amber-600">here</router-link
          >!
        </h2></BaseCard
      >
    </li>
  </ul>

  <BaseCard class="flex justify-center" v-else-if="venues === null">
    <h1 class="text-2xl font-semibold my-5">
      No saved venues. Find your favourite venue
      <router-link to="/add-venue" class="text-amber-600">here</router-link>!
    </h1>
  </BaseCard>
  <p v-else>Loading venues...</p>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["venues"]),
  },
  methods: {
    ...mapActions(["fetchData"]),
  },
  async created() {
    // if (this.venues.length === 0) this.$store.dispatch("fetchData");

    this.fetchData();
  },
};
</script>

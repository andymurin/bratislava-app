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
  </ul>
  <p v-else-if="venues === null">
    No saved venues. Find your favourite venue
    <router-link :to="{ name: addVenue }">here</router-link>
  </p>
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

<template>
  <ul v-if="venues.length">
    <li v-for="venue in venues" :key="venue.id">
      <BaseCard>
        <h2 class="text-lg font-semibold">{{ venue.name }}</h2>
        <p>{{ venue.adress }}</p>
      </BaseCard>
    </li>
  </ul>
  <p v-else="">Loading venues...</p>
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

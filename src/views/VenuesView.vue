<template>
  <div>
    <div class="mt-2 flex justify-end">
      <BaseBadge
        v-for="venueType in venueTypes"
        @click="setSelectedType(venueType)"
        :key="venueType"
        :class="[
          venueType === selectedType && ['text-amber-600', 'border-amber-600'],
        ]"
        v-if="venueTypes.length > 1"
      >
        {{ venueType }}
      </BaseBadge>
    </div>
    <ul v-if="venues?.length">
      <li v-for="venue in filteredVenues" :key="venue.id">
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
            <router-link to="/add-venue" class="text-amber-600"
              >here</router-link
            >!
          </h2></BaseCard
        >
      </li>
    </ul>

    <BaseCard class="flex justify-center" v-else-if="venues">
      <h1 class="text-2xl font-semibold my-5">
        No saved venues. Find your favourite venue
        <router-link to="/add-venue" class="text-amber-600">here</router-link>!
      </h1>
    </BaseCard>
    <p v-else>Loading venues...</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      selectedType: null,
    };
  },
  computed: {
    ...mapState(["venues"]),
    venueTypes() {
      return [...new Set(this.venues.map((venue) => venue.type))].map((type) =>
        type
          .split("_")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
      );
    },
    filteredVenues() {
      if (!this.selectedType) {
        return this.venues;
      }
      const formattedType = this.selectedType
        .toLowerCase()
        .replaceAll(" ", "_");
      return this.venues.filter((venue) => venue.type === formattedType);
    },
  },
  methods: {
    ...mapActions(["fetchData"]),
    setSelectedType(venueType) {
      this.selectedType = this.selectedType === venueType ? null : venueType;
    },
  },
  async created() {
    this.fetchData();
    console.log(this.venueTypes);
  },
};
</script>

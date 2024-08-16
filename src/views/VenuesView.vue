<template>
  <div>
    <div v-if="isLoading">
      <p>Loading venues...</p>
    </div>
    <template v-else>
      <div v-if="hasVenues">
        <div class="mt-2 flex justify-end">
          <BaseBadge
            v-for="venueType in venueTypes"
            :key="venueType"
            :class="{
              'text-amber-600 border-amber-600': venueType === selectedType,
            }"
            @click="setSelectedType(venueType)"
          >
            {{ venueType }}
          </BaseBadge>
        </div>
        <ul>
          <li v-for="venue in filteredVenues" :key="venue.id">
            <BaseCard>
              <router-link :to="`/venue/${venue.id}`">
                <h2 class="text-lg font-semibold">{{ venue.name }}</h2>
                <p>{{ venue.address }}</p>
              </router-link>
            </BaseCard>
          </li>
          <li>
            <BaseCard>
              <h2 class="text-lg font-semibold">
                Didn't find your favourite venue? Try
                <router-link to="/add-venue" class="text-amber-600"
                  >here</router-link
                >!
              </h2>
            </BaseCard>
          </li>
        </ul>
      </div>
      <BaseCard v-else class="flex justify-center">
        <h1 class="text-2xl font-semibold my-5">
          No saved venues. Find your favourite venue
          <router-link to="/add-venue" class="text-amber-600">here</router-link
          >!
        </h1>
      </BaseCard>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      selectedType: null,
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(["venuesList", "hasVenues", "venueTypes"]),
    filteredVenues() {
      if (!this.selectedType) {
        return this.venuesList;
      }
      const formattedType = this.formatVenueType(this.selectedType, true);
      return this.venuesList.filter(function (venue) {
        return venue.type === formattedType;
      });
    },
  },
  methods: {
    ...mapActions(["fetchData"]),
    setSelectedType(venueType) {
      this.selectedType = this.selectedType === venueType ? null : venueType;
    },
    formatVenueType(type, reverse) {
      if (reverse) {
        return type.toLowerCase().split(" ").join("_");
      }
      return type
        .split("_")
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
    },
    async loadVenues() {
      try {
        this.isLoading = true;
        await this.fetchData();
      } catch (error) {
        console.error("Error fetching venues:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.loadVenues();
  },
};
</script>

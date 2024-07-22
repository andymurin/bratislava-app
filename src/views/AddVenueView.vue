<template>
  <BaseCard class="flex flex-col items-center gap-2">
    <div
      :class="{ hidden: newVenueAdded }"
      class="flex flex-col items-center gap-2"
    >
      <h1 class="text-2xl font-semibold mb-4">Find your favourite venue</h1>
      <div class="flex flex-wrap justify-center border-solid">
        <input
          class="border-black h-10 w-80 rounded-md border-solid border-spacing-4 border-2"
          ref="venueInput"
          type="text"
          placeholder="Start typing..."
        />
      </div>
      <section v-if="selectedVenue" class="flex flex-col items-center gap-2">
        <BaseCard class="flex flex-col items-center gap-2 mb-0">
          <h2 class="font-semibold text-xl">
            {{ selectedVenue.name }}
          </h2>
          <p>
            {{ selectedVenue.vicinity }}
          </p>
          <a
            v-if="selectedVenue.website"
            :href="selectedVenue.website"
            target="_blank"
            rel="noopener noreferrer"
            class="no-underline hover:text-amber-600"
          >
            <span class="flex gap-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="hover:text-amber-600"
              >
                <path
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"
                />
              </svg>
              Website
            </span>
          </a>
        </BaseCard>
        <BaseButton class="my-8 max-w-max h-full" @click="submitVenue">
          Add to favourites
        </BaseButton>
      </section>
    </div>
    <h2 class="font-semibold text-xl" v-if="newVenueAdded">
      Venue has been added to favourites!
    </h2>
  </BaseCard>
  <BaseCard v-if="!newVenueAdded" class="flex justify-center mt-20"
    ><h2 class="text-lg font-semibold">
      See the list of your favourite venues
      <router-link to="/venues" class="text-amber-600">here</router-link>!
    </h2></BaseCard
  >
</template>

<script>
import axios from "axios";
import InputText from "primevue/inputtext";
export default {
  components: {
    InputText,
  },
  data() {
    return {
      selectedVenue: "",
      newVenueAdded: false,
    };
  },
  methods: {
    submitVenue() {
      try {
        axios.put(
          `https://bratislavska-pivaren-9bfe5-default-rtdb.europe-west1.firebasedatabase.app/venues/${this.selectedVenue.place_id}.json`,
          {
            name: this.selectedVenue.name,
            address: this.selectedVenue.vicinity,
            openingHours: this.selectedVenue.opening_hours.periods,
            id: this.selectedVenue.place_id,
            type: this.selectedVenue.types[0],
            web: this.selectedVenue.website,
          }
        );
        this.newVenueAdded = true;
        setTimeout(() => {
          // this.selectedVenue = null;
          // this.$refs.venueInput.value = "";
          this.newVenueAdded = false;
          this.$router.push(`/venue/${this.selectedVenue.place_id}`);
        }, 2000);
      } catch (err) {
        console.error("Something went went wrong.", err);
      }
    },
  },
  mounted() {
    const venueAutocomplete = new google.maps.places.Autocomplete(
      this.$refs.venueInput,
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(48.14816, 17.10674)
        ),
        componentRestrictions: { country: "sk" },
        types: ["bar", "cafe", "restaurant", "night_club"],
      }
    );
    venueAutocomplete.addListener("place_changed", () => {
      console.log(venueAutocomplete.getPlace());
      this.selectedVenue = venueAutocomplete.getPlace();
    });
  },
};
</script>

<style scpoed>
.pac-icon {
  display: none;
}
.pac-item {
  padding: 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  font-family: "Quicksand", sans-serif;
}
.pac-item:hover {
  background-color: rgba(251, 190, 36, 0.4);
}
.pac-item-query {
  font-size: 0.75rem;
  font-family: "Quicksand", sans-serif;
}
</style>

<template>
  <h1>Add venue</h1>

  <div class="flex flex-wrap justify-center gap-3 border-solid">
    <input
      class="border-black h-10 w-80 rounded-md border-solid border-spacing-4 border-2"
      ref="venueInput"
      type="text"
      placeholder="Enter venue name"
    />
  </div>

  <p>
    {{ value1 }}
  </p>
</template>

<script>
import InputText from "primevue/inputtext";
export default {
  components: {
    InputText,
  },
  data() {
    return {
      value1: null,
      value2: null,
    };
  },
  mounted() {
    const venueAutocomplete = new google.maps.places.Autocomplete(
      this.$refs.venueInput,
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(48.14816, 17.10674)
        ),
        componentRestrictions: { country: "sk" },
        // types: ["(bar)", "(cafe)", "(restaurant)", "(night_club)"],
        types: ["bar", "cafe", "restaurant", "night_club"],
      }
    );

    venueAutocomplete.addListener("place_changed", () => {
      console.log(venueAutocomplete.getPlace());
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

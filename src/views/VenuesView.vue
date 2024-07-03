<template>
  <h1>Venues view</h1>
  <div>
    <ul v-for="venue in venues">
      <li>
        <h2>{{ venue.name }}</h2>
        <p>{{ venue.adress }}</p>
        <br />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      venues: [],
    };
  },
  methods: {
    async fetchData() {
      let data;
      await axios
        .get(
          "https://bratislavska-pivaren-9bfe5-default-rtdb.europe-west1.firebasedatabase.app/venues.json"
        )
        .then((res) => (data = res.data));
      this.venues = Object.values(data);
      console.log(JSON.parse(JSON.stringify(this.venues)));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

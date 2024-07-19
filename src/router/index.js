import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/add-venue",
    name: "addVenue",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "addVenue" */ "../views/AddVenueView.vue"),
  },
  {
    path: "/venues",
    name: "venuesView",
    component: () =>
      import(/* webpackChunkName: "venuesView" */ "../views/VenuesView.vue"),
  },
  {
    path: "/venue/:id",
    name: "VenueDetail",
    props: true,
    component: () =>
      import(/* webackChunkName: "venueDetail" */ "../views/VenueDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

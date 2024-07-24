import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/add-venue",
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
      import(/* webpackChunkName: "venueDetail" */ "../views/VenueDetail.vue"),
  },
  {
    path: "/auth",
    component: () =>
      import(/* webpackChunkName: "UserAuth" */ "../views/Auth/UserAuth.vue"),
  },
  { path: "/:catchAll(.*)", redirect: "/add-venue" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(from, to, savedPosition) {
    if (savedPosition) return savedPosition;
    return { left: 0, top: 0 };
  },
});

export default router;

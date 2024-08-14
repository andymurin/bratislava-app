import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

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
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "venuesView" */ "../views/VenuesView.vue"),
  },
  {
    path: "/venue/:id",
    name: "venueDetail",
    meta: { requiresAuth: true },
    props: true,
    component: () =>
      import(/* webpackChunkName: "venueDetail" */ "../views/VenueDetail.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    meta: { requiresUnauth: true },
    component: () =>
      import(/* webpackChunkName: "UserAuth" */ "../views/Auth/UserAuth.vue"),
  },
  { path: "/:catchAll(.*)", redirect: "/add-venue" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) return savedPosition;
    return { left: 0, top: 0 };
  },
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/venues");
  } else {
    next();
  }
});

export default router;

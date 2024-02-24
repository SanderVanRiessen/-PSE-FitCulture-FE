import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";

const routes = [
  { path: "/", name: "default", component: LandingPage },
  { path: "/landingpage", name: "landing", component: LandingPage },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

import { createRouter, createWebHistory, Router } from "vue-router";

import SpMain from "@/pages/SpMain.vue";

// Vue router
export const router: Router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "Home", component: SpMain }]
});

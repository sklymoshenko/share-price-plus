import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "@/router/routes";

// Vue router
export const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

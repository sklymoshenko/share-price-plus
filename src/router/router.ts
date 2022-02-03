import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "../router/routes";
import { useCookies } from "vue3-cookies";

// Vue router
export const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const { cookies } = useCookies();
  const isAuthenticated = cookies.get("spid");
  if (to.name !== "SignIn" && !isAuthenticated) next({ name: "SignIn" });
  else next();
});

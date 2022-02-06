import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "../router/routes";
import { useCookies } from "vue3-cookies";

// Vue router
export const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

const safeRoutes = ["SignIn", "SignUp"];

router.beforeEach((to, from, next) => {
  const { cookies } = useCookies();
  const isAuthenticated = cookies.get("spid");
  if (!safeRoutes.includes(String(to.name)) && !isAuthenticated) next({ name: "SignIn" });
  else next();
});

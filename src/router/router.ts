import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "../router/routes";
import { useCookies } from "vue3-cookies";

// Vue router
export const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // else next()
  const { cookies } = useCookies();
  console.log(cookies.get("spid"));
  next();
});

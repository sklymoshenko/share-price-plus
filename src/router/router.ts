import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "../router/routes";
import { store } from "@/store/store";

// Vue router
export const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

const safeRoutes = ["SignIn", "SignUp"];

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.state.currentUser;
  if (!safeRoutes.includes(String(to.name)) && !isAuthenticated) next({ name: "SignIn" });
  else next();
});

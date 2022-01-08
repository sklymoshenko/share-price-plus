// Layouts
import Default from "@/layouts/Default.vue";

// Pages
import SpMain from "@/pages/SpMain.vue";
import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Default,
    children: [
      {
        path: "simple-calculations",
        name: "Simple",
        component: SpMain
      }
    ]
  }
];

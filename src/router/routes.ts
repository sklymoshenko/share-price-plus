import { RouterOptions } from "vue-router";

// Layouts
import Default from "@/layouts/Default.vue";

// Pages
import SpMain from "@/pages/SpMain.vue";
import SpUser from "@/pages/SpUser.vue";
import SpEvents from "@/pages/SpEvents.vue";

export const routes: RouterOptions["routes"] = [
  {
    path: "/",
    name: "Home",
    component: Default,
    children: [
      {
        path: "simple-calculations",
        name: "Simple",
        component: SpMain
      },
      {
        path: "user",
        name: "User",
        component: SpUser
      },
      {
        path: "events",
        name: "Events",
        component: SpEvents
      }
    ]
  }
];

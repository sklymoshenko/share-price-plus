import { createApp, provide } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";
import { router } from "@/router/router";
import { apolloClient } from "./services/apollo";
import { provideApolloClient } from "@vue/apollo-composable";
import { store, key } from "./store/store";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";

// Import Quasar css
import "quasar/src/css/index.sass";

createApp({
  ...App,
  setup() {
    provideApolloClient(apolloClient);
  }
})
  .use(Quasar, {
    plugins: { Notify }, // import Quasar plugins and add here
    config: {
      notify: {
        position: "top",
        timeout: 5000,
        textColor: "white"
      }
    }
  })
  .use(router)
  .use(store, key)
  .mount("#app");

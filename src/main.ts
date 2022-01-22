import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";
import { router } from "@/router/router";
import { createApolloProvider } from "@vue/apollo-option";
import { apolloClient } from "./services/apollo";

// Set up Apollo
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
});

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";

// Import Quasar css
import "quasar/src/css/index.sass";

createApp(App)
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
  .use(apolloProvider)
  .use(router)
  .mount("#app");

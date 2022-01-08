import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";

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
  .mount("#app");

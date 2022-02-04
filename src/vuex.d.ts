// vuex.d.ts
import { Store } from "vuex";
import { ISpUser } from "./types/entities/user";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    currentUser: ISpUser | null;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

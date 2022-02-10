// vuex.d.ts
import { Store } from "vuex";
import { ISpEvent } from "./types/entities/event";
import { ISpUser } from "./types/entities/user";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    currentUser: ISpUser | null;
    spEvents: ISpEvent[] | null;
    currentEvent: ISpEvent | null;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

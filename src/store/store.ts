// store.ts
import { ISpUser } from "@/types/entities/user";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  currentUser: ISpUser | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    currentUser: null
  },
  mutations: {
    setCurrentUser(state: State, user: ISpUser | null) {
      state.currentUser = user;
    }
  }
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

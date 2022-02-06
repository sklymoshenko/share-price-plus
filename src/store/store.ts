// store.ts
import { ISpEvent } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { apolloClient } from "@/services/apollo";

// Queries
import { EVENTS_QUERY } from "@/queries/spEvents";
import { CURRENT_USER } from "@/queries/spCurrentUser";

export interface State {
  currentUser: ISpUser | null;
  spEvents: ISpEvent[] | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    currentUser: null,
    spEvents: null
  },
  mutations: {
    setCurrentUser(state: State, user: ISpUser | null) {
      state.currentUser = user;
    },
    setEvents(state: State, events: ISpEvent[] | null) {
      state.spEvents = events;
    }
  },
  actions: {
    async getEvents({ state, commit }): Promise<void> {
      if (!state.currentUser) return;
      const {
        data: { spEvents }
      }: { data: { spEvents: ISpEvent[] } } = await apolloClient.query({
        query: EVENTS_QUERY,
        variables: {
          idIn: state.currentUser?.events
        }
      });
      commit("setEvents", spEvents);
    },
    async getCurrentUser({ commit }): Promise<void> {
      const {
        data: { currentUser }
      }: { data: { currentUser: ISpUser } } = await apolloClient.query({
        query: CURRENT_USER
      });
      commit("setCurrentUser", currentUser);
    }
  }
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

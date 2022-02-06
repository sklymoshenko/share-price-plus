// store.ts
import { ISpEvent } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { apolloClient } from "@/services/apollo";

// Queries
import { EVENTS_QUERY } from "@/queries/spEvents";
import { CURRENT_USER } from "@/queries/spCurrentUser";
import { USER_QUERY } from "@/queries/spUser";

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
    async getEvents({ commit }, eventsIds: ISpEvent["_id"][]): Promise<void> {
      const {
        data: { spEvents }
      }: { data: { spEvents: ISpEvent[] } } = await apolloClient.query({
        query: EVENTS_QUERY,
        variables: {
          idIn: eventsIds
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
    },
    async getUserEvents({ state, commit }, id: ISpUser["_id"]): Promise<void> {
      if (!id) return;
      const {
        data: { spUsers }
      }: { data: { spUsers: ISpUser[] } } = await apolloClient.query({
        query: USER_QUERY
      });

      if (id === state.currentUser?._id) {
        commit("setCurrentUser", { ...state.currentUser, events: spUsers[0].events });
      }
    }
  }
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

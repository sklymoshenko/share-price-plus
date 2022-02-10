// store.ts
import { ISpEvent, ISpEventUpload } from "@/types/entities/event";
import { ISpUser } from "@/types/entities/user";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { apolloClient } from "@/services/apollo";

// Queries
import { EVENTS_QUERY } from "@/gql/queries/spEvents";
import { CURRENT_USER } from "@/gql/queries/spCurrentUser";
import { USER_QUERY } from "@/gql/queries/spUser";
import { UPDATE_EVENT } from "@/gql/mutations/updateEvent";

export interface State {
  currentUser: ISpUser | null;
  spEvents: ISpEvent[] | null;
  currentEvent: ISpEvent | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    currentUser: null,
    spEvents: null,
    currentEvent: null
  },
  mutations: {
    setCurrentUser(state: State, user: ISpUser | null) {
      state.currentUser = user;
    },
    setEvents(state: State, events: ISpEvent[] | null) {
      state.spEvents = events;
    },
    setCurrentEvent(state: State, event: ISpEvent | null) {
      state.currentEvent = event;
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
    async getUserEventsIds({ state, commit }, id: ISpUser["_id"]): Promise<void> {
      if (!id) return;
      const {
        data: { spUsers }
      }: { data: { spUsers: ISpUser[] } } = await apolloClient.query({
        query: USER_QUERY
      });

      if (id === state.currentUser?._id) {
        commit("setCurrentUser", { ...state.currentUser, events: spUsers[0].events });
      }
    },
    async updateEvent({ commit }, { data, current = false }: { data: ISpEventUpload; current: boolean }) {
      const result: { data?: { updateEvent: ISpEvent } | null | undefined } = await apolloClient.mutate({
        mutation: UPDATE_EVENT,
        variables: data
      });

      if (current) {
        commit("setCurrentEvent", result?.data?.updateEvent);
      }
    },
    async getCurrentEvent({ commit }, id: ISpEvent["_id"]): Promise<void> {
      if (!id) return;
      const {
        data: { spEvents }
      }: { data: { spEvents: ISpEvent[] } } = await apolloClient.query({
        query: EVENTS_QUERY,
        variables: { idIn: [id] }
      });

      commit("setCurrentEvent", spEvents[0]);
    }
  }
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

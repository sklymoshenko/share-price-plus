// store.ts
import { ISpUser } from "@/types/entities/user";
import gql from "graphql-tag";
import { apolloClient } from "@/services/apollo";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

provideApolloClient(apolloClient);

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
  },
  getters: {
    user: async (s): Promise<ISpUser | null> => {
      if (s.currentUser) return s.currentUser;

      const user = await getCurrentUser();
      return user;
    }
  }
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

async function getCurrentUser(): Promise<ISpUser | null> {
  const CURRENT_USER = gql`
    query CurrentUser {
      currentUser {
        _id
        name
        events
        eventsCount
        email
      }
    }
  `;

  const data = await useQuery(CURRENT_USER);
  debugger;

  return null;
}

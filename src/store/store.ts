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
    user: (s): ISpUser | null => {
      if (s.currentUser) return s.currentUser;

      const { currentUser } = getCurrentUser() || ({} as { currentUser: ISpUser | null });
      return currentUser;
    }
  }
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

function getCurrentUser(): { currentUser: ISpUser | null } {
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

  const { result } = useQuery(CURRENT_USER);
  return result.value || null;
}

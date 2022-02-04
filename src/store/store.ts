// store.ts
import { ISpUser } from "@/types/entities/user";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@vue/apollo-composable";
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
  },
  getters: {
    user: async (s): Promise<ISpUser | null> => {
      if (s.currentUser) return s.currentUser;

      // const user: Promise<ISpUser | null> = await getCurrentUser();
      return s.currentUser;
    }
  }
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

// async function getCurrentUser(): Promise<ISpUser | null> {
//   const CURRENT_USER = gql`
//     query CurrentUser {
//       currentUser {
//         _id
//         name
//         events
//         eventsCount
//         email
//       }
//     }
//   `;

//   const { result }: any = useQuery(CURRENT_USER);
//   return result || null;
// }

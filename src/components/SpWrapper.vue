<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";

// Components
import SpMain from "@/pages/SpMain.vue";
import { ISpUser } from "@/types/entities/user";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { useStore } from "@/store/store";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";

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

export default defineComponent({
  name: "SpWrapper",
  components: { SpMain },
  setup() {
    const store = useStore();
    const { cookies } = useCookies();
    const currentUser = computed<ISpUser | null>(() => store.state.currentUser);

    const isAuthenticated = cookies.get("spid");

    // We want to get a currentUser from server when refresh and already authenticated
    if (!currentUser.value && isAuthenticated) {
      const { result } = useQuery(CURRENT_USER);

      // Well idk how to handle it, but this useQuery returns first undefined, and then returns a currentUser.
      watch(
        () => result.value,
        (newVal, oldVal) => {
          if (!newVal) return;
          if (newVal === oldVal) return;

          store.commit("setCurrentUser", newVal.currentUser);
        }
      );
    }

    return {};
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

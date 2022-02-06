<template>
  <!-- To use a async setup in child components -->
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

// Components
import SpMain from "@/pages/SpMain.vue";
import { ISpUser } from "@/types/entities/user";
import { useStore } from "@/store/store";
import { useCookies } from "vue3-cookies";

export default defineComponent({
  name: "SpWrapper",
  components: { SpMain },
  async setup() {
    const store = useStore();
    const { cookies } = useCookies();

    const currentUser = computed<ISpUser | null>(() => store.state.currentUser);
    const isAuthenticated = cookies.get("spid");

    // We want to get a currentUser from server when refresh and already authenticated
    if (!currentUser.value && isAuthenticated) {
      await store.dispatch("getCurrentUser");
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

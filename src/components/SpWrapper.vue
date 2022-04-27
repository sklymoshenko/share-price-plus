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
import { getAuthCookie } from "@/services/calculations";

export default defineComponent({
  name: "SpWrapper",
  components: { SpMain },
  async setup() {
    const store = useStore();
    const currentUser = computed<ISpUser | null>(() => store.state.currentUser);
    const isAuthenticated = !!getAuthCookie();
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

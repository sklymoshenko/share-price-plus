<template>
  <q-layout container style="height: 90vh" class="default-layout">
    <q-header class="bg-white text-black">
      <h4 style="line-height: 0.2rem">{{ title }}</h4>
    </q-header>
    <q-page-container>
      <q-page>
        <div class="default-layout-view">
          <router-view></router-view>
        </div>
        <q-page-sticky position="bottom-right" :offset="fabPos" v-if="routeOmit">
          <q-fab
            icon="keyboard_arrow_up"
            direction="up"
            color="secondary"
            v-touch-pan.prevent.mouse="moveFab"
            :disable="draggingFab"
          >
            <q-fab-action
              v-for="(action, i) in actions"
              :key="i"
              color="primary"
              external-label
              :label="action.name"
              label-position="left"
              :icon="icons[i]"
              :to="action.to"
            />
          </q-fab>
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

// Router
import { routes } from "../router/routes";

// Types
import { IRouteAction } from "../types/layout";

export default defineComponent({
  name: "Default",
  setup() {
    const route = useRoute();
    const fabPos = ref([18, 18]);
    const draggingFab = ref<boolean>(false);
    const title: string = "Share Price Plus+";
    const icons: string[] = ["home", "bar_chart", "person", "article"];
    const routeOmit = computed(() => {
      const routeName = route.name || "";
      return !["SignIn", "SignUp"].includes(String(routeName));
    });

    const moveFab = (ev: any) => {
      draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;

      fabPos.value = [fabPos.value[0] - ev.delta.x, fabPos.value[1] - ev.delta.y];
    };

    const actions: IRouteAction[] | undefined =
      routes[0].children
        ?.map((route) => ({
          name: String(route.name),
          to: `/${route.path}`
        }))
        ?.filter((r) => !["Event", "SignIn", "SignUp"].includes(r.name)) || [];

    return {
      actions,
      icons,
      title,
      draggingFab,
      moveFab,
      fabPos,
      routeOmit
    };
  }
});
</script>

<style scoped>
.default-layout-view {
  height: 78vh;
  width: 80%;
  margin: 0 auto;
  touch-action: manipulation;
}
</style>

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
        <q-page-sticky position="bottom-right" :offset="[10, 10]">
          <q-fab icon="add" direction="up" color="secondary">
            <q-fab-action
              v-for="(action, i) in routesActions || []"
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
import { defineComponent } from "vue";

import { routes } from "../router/routes";

// Types
import { RouteAction } from "../types/layout";

export default defineComponent({
  name: "Default",
  setup() {
    const title: string = "Share Price Plus+";
    const routesActions: RouteAction[] | undefined = routes[0].children?.map((route) => ({
      name: String(route.name),
      to: route.path
    }));

    const icons: string[] = ["bar_chart", "person", "article"];

    return {
      routesActions,
      icons,
      title
    };
  }
});
</script>

<style scoped>
.default-layout-view {
  height: 78vh;
  width: 80%;
  margin: 0 auto;
}
</style>

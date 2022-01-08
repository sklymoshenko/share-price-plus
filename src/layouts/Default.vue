<template>
  <q-layout>
    <q-page-container>
      <h4>{{ title }}</h4>
      <router-view></router-view>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
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

    const icons: string[] = ["bar_chart"];

    return {
      routesActions,
      icons,
      title
    };
  }
});
</script>

<style scoped></style>

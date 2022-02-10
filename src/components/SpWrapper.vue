<template>
  <!-- To use a async setup in child components -->
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import SpMain from "@/pages/SpMain.vue";

export default defineComponent({
  name: "SpWrapper",
  components: { SpMain }
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

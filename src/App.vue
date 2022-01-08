<template>
  <ReloadPWA />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import SpMain from "@/pages/SpMain.vue";
import ReloadPWA from "./components/ReloadPWA.vue";

export default defineComponent({
  name: "App",
  components: { SpMain, ReloadPWA }
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

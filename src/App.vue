<template>
  <ReloadPWA />
  <SpWrapper />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import SpWrapper from "@/components/SpWrapper.vue";
import ReloadPWA from "@/components/ReloadPWA.vue";

export default defineComponent({
  name: "App",
  components: { SpWrapper, ReloadPWA }
});
</script>

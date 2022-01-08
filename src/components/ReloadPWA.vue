<template>
  <q-card class="my-card bg-secondary text-white" v-if="offlineReady || needRefresh" role="alert">
    <q-card-section>
      <div class="text-h6">
        <span v-if="offlineReady"> App ready to work offline </span>
        <span v-else>New content available, click on reload button to update.</span>
      </div>
    </q-card-section>
    <q-separator dark />

    <q-card-actions>
      <q-btn flat v-if="needRefresh" @click="updateServiceWorkerLoc()">Reload</q-btn>
      <q-btn flat @click="close">Close</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRegisterSW } from "virtual:pwa-register/vue";

export default defineComponent({
  name: "ReloadPWA",
  setup() {
    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
    const close = async () => {
      offlineReady.value = false;
      needRefresh.value = false;
    };

    const updateServiceWorkerLoc = async () => {
      await updateServiceWorker();
    };

    return { offlineReady, needRefresh, updateServiceWorkerLoc, close };
  }
});
</script>

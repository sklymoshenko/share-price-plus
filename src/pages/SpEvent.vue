<template>
  <SpResultsPreview v-if="spEvent" :price="spEvent.price" :participants="spEvent.participants" hide-buttons />
  <SpEventNew v-else />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store/store";

// Types
import { ISpEvent } from "@/types/entities/event";

// Components
import SpResultsPreview from "@/components/SpResultsPreview.vue";
import SpEventNew from "@/components/SpEventNew.vue";

// Services
import { calculateResults } from "@/services/calculations";

export default defineComponent({
  name: "SpEvent",
  components: { SpResultsPreview, SpEventNew },
  setup() {
    const route = useRoute();
    const store = useStore();
    const spEventId: ISpEvent["_id"] = route.params.id as ISpEvent["_id"];

    // Property 'find' does not exist on type 'ComputedRef<ISpEvent[]> changing target of ts compiler didnt work :/
    const events = computed<ISpEvent[]>(() => store.state.spEvents || []);

    const spEvent = computed((): ISpEvent | null => {
      if (spEventId === "new") return null;
      return events.value.find((e: ISpEvent) => e._id === spEventId) || events.value[0];
    });

    // Calculate on mount
    if (spEvent.value) {
      calculateResults(spEvent.value.participants, spEvent.value.price);
    }

    return { spEvent };
  }
});
</script>

<style scoped></style>

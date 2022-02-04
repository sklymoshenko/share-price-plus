<template>
  <SpResultsPreview v-if="spEvent" :price="spEvent.price" :participants="spEvent.participants" hide-buttons />
  <SpEventNew v-else />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

// Types
import { ISpEvent } from "@/types/entities/event";

// Mocks
import { events } from "@/mock";

// Components
import SpResultsPreview from "@/components/SpResultsPreview.vue";
import { calculateResults } from "@/services/calculations";
import SpEventNew from "@/components/SpEventNew.vue";

export default defineComponent({
  name: "SpEvent",
  components: { SpResultsPreview, SpEventNew },
  setup() {
    const route = useRoute();

    const spEventId: ISpEvent["_id"] = route.params.id as ISpEvent["_id"];

    const spEvent = computed((): ISpEvent | null => {
      if (spEventId === "new") return null;
      return events.find((e) => e._id === spEventId) || events[0];
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

<template>
  <SpResultsPreview :price="spEvent.price" :peopleConfig="spEvent.participants" hide-buttons />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

// Types
import { ISpEvent } from "@/types/entities/event";

// Mocks
import { events } from "@/events-mock";

// Components
import SpResultsPreview from "@/components/SpResultsPreview.vue";
import { calculateResults } from "@/services/calculations";

export default defineComponent({
  name: "SpEvent",
  components: { SpResultsPreview },
  setup() {
    const route = useRoute();

    const spEventId: ISpEvent["id"] = route.params.id as ISpEvent["id"];

    const spEvent = computed((): ISpEvent => {
      return events.find((e) => e.id === spEventId) || events[0];
    });

    // Calculate on mount
    calculateResults(spEvent.value.participants, spEvent.value.price);

    return { spEvent };
  }
});
</script>

<style scoped></style>

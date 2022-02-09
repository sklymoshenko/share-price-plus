<template>
  <SpEventNew v-if="isNew" :current-user="currentUser" />
  <SpEventEdit v-else-if="!spEvent?.isClosed" :sp-event="spEvent" :current-user="currentUser" />
  <SpResultsPreview
    v-else-if="spEvent?.isClosed"
    :price="spEvent.price"
    :participants="spEvent.participants"
    hide-buttons
  />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store/store";

// Types
import { ISpEvent } from "@/types/entities/event";

// Components
import SpResultsPreview from "@/components/SpResultsPreview.vue";
import SpEventNew from "@/components/SpEvent/SpEventNew.vue";
import SpEventEdit from "@/components/SpEvent/SpEventEdit/SpEventEdit.vue";

// Services
import { ISpUser } from "@/types/entities/user";

export default defineComponent({
  name: "SpEvent",
  components: { SpResultsPreview, SpEventNew, SpEventEdit },
  setup() {
    const route = useRoute();
    const store = useStore();
    const spEventId: ISpEvent["_id"] = route.params.id as ISpEvent["_id"];
    const isNew = computed<boolean>(() => spEventId === "new");
    const currentUser = computed<ISpUser>(() => store.state.currentUser!);

    const events = computed<ISpEvent[]>(() => store.state.spEvents || []);

    const spEvent = computed((): ISpEvent => {
      return events.value.find((e: ISpEvent) => e._id === spEventId) || events.value[0];
    });

    return { spEvent, isNew, currentUser };
  }
});
</script>

<style scoped></style>

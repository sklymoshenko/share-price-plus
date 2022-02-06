<template>
  <div>
    <div class="events-bar row justify-between">
      <div class="text-h6 text-left">Events</div>
      <q-page-sticky position="top-right" :offset="[50, 1]">
        <q-btn color="primary" icon="add" :to="{ name: 'Event', params: { id: 'new' } }" />
      </q-page-sticky>
    </div>
    <div style="width: 100%" class="q-mt-md">
      <q-list separator>
        <SpEventItem v-for="event in events" :key="event._id" :sp-event="event" :current-user="currentUser" />
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store/store";

// Components
import SpEventItem from "@/components/SpEventItem.vue";

// Types
import { ISpUser } from "@/types/entities/user";
import { ISpEvent } from "@/types/entities/event";

export default defineComponent({
  name: "SpEvents",
  async setup() {
    const store = useStore();
    const currentUser = computed<ISpUser | null>(() => store.state.currentUser);
    await store.dispatch("getEvents");
    const events = computed<ISpEvent[] | null>(() => store.state.spEvents);

    return { events, currentUser };
  },
  components: { SpEventItem }
});
</script>

<style scoped></style>

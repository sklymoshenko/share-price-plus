<template>
  <div>
    <div class="events-bar row justify-between">
      <div class="text-h6 text-left">Events</div>
      <q-page-sticky position="top-right" :offset="[50, 0]">
        <q-btn color="primary" icon="add" :to="{ name: 'Event', params: { id: 'new' } }" />
      </q-page-sticky>
    </div>
    <q-card v-if="!events?.length" flat bordered class="my-card text-center empty-events">
      <q-card-section class="text-body1"> You dont have any events </q-card-section>
    </q-card>
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
import SpEventItem from "@/components/SpEvent/SpEventItem.vue";

// Types
import { ISpUser } from "@/types/entities/user";
import { ISpEvent } from "@/types/entities/event";
import { useQuasar } from "quasar";
import { safeMethod } from "@/services/safeMethod";

export default defineComponent({
  name: "SpEvents",
  async setup() {
    const $q = useQuasar();
    const store = useStore();
    const currentUser = computed<ISpUser | null>(() => store.state.currentUser);
    const loadEventsToStore = async (): Promise<void> => {
      await store.dispatch(
        "getEvents",
        currentUser.value?.events.map((id) => id)
      );
    };
    await safeMethod(loadEventsToStore);

    const events = computed<ISpEvent[] | null>(() => store.state.spEvents);

    return { events, currentUser };
  },
  components: { SpEventItem }
});
</script>

<style scoped>
.empty-events {
  margin-top: 40%;
}
</style>

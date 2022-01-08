<template>
  <div>
    <div class="text-h6 text-left">Events</div>
    <div style="width: 100%" class="q-mt-md">
      <q-list separator>
        <SpEventItem v-for="event in events" :key="event.id" :sp-event="event" :current-user="currentUser" />
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

// Components
import SpEventItem from "@/components/SpEventItem.vue";

// Types
import { ISpUser } from "@/types/entities/user";

// Mocks
import { events } from "@/events-mock";

export default defineComponent({
  name: "SpEvents",
  setup() {
    const currentUser = computed((): ISpUser => {
      return { id: "userId1", name: "Chuck", email: "chuck.horny@seznam.cz" };
    });

    return { events, currentUser };
  },
  components: { SpEventItem }
});
</script>

<style scoped></style>
